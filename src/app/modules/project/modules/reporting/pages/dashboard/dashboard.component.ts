import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { ConfirmModalComponent } from 'src/app/components/confirm-modal/confirm-modal.component';
import { DashboardChart } from 'src/app/models/classes/dashboard-chart.model';
import { Project } from 'src/app/models/classes/project.model';
import { User } from 'src/app/models/classes/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { ProjectService } from 'src/app/services/project.service';
import { ReportingService } from 'src/app/services/reporting.service';
import { TimeSlotPeriodicity } from 'src/app/utils/time-slot-periodicity';
import TimeSlot from 'timeslot-dag';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  get currentLang(): string {
    return this.translateService.currentLang
      ? this.translateService.currentLang
      : this.translateService.defaultLang;
  }

  public project: Project;
  public charts = [];
  public loading = true;
  public userIsAdmin = false;

  private subscription = new Subscription();


  constructor(
    private reportingService: ReportingService,
    private projectService: ProjectService,
    private translateService: TranslateService,
    private authService: AuthService,
    private dialog: MatDialog
  ) {
  }

  public ngOnInit() {
    this.subscription.add(
      this.projectService.project.subscribe((project: Project) => {
        this.project = project;
        this.loadCharts(this.project.dashboard);
        const userSubscription = this.authService.currentUser.subscribe(
          (user: User) => {
            user.role === 'admin' || user.role === 'owner'
              ? (this.userIsAdmin = true)
              : (this.userIsAdmin = false);
          }
        );
        userSubscription.unsubscribe();
      })
    );
  }

  public onDeleteChart(id: string) {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {data: {messageId: 'RemoveGraphToDashboardConfirmation'}});
    const dialogSubscription = dialogRef.afterClosed().subscribe(res => {
      if (res.confirm) {
        const projectCharts = this.project.dashboard;
        projectCharts.splice(
          projectCharts.findIndex(g => g.id === id),
          1
        )
        this.charts.splice(
          this.charts.findIndex(g => g.id === id),
          1
        )
        this.projectService.setDashboard(projectCharts);
      }
      dialogSubscription.unsubscribe();
    });
  }

  private async loadCharts(projectCharts: DashboardChart[]) {
    const loadedCharts = [];
    for (const projectChart of projectCharts) {
      const chart = structuredClone(projectChart);
      console.log(chart);
      loadedCharts.push(chart);
      // Get labels
      chart['labels'] = this.getLabels(chart.meta.dimension, chart.meta.filter).map(x => this.getSiteOrGroupName(x, chart.meta.dimension));
      for (const dataset of chart.datasets) {
        await this.reportingService
          .fetchData(
            this.project,
            dataset.meta.computation,
            [chart.meta.dimension],
            dataset.meta.filter,
            true,
            false,
            false
          )
          .then(response => {
            if (response) {
              dataset['data'] = this.formatResponseToDataset(response.items, chart.meta.dimension);
              dataset['fill'] = false;
            }
          });
        }
    }
    this.loading = false;
    this.charts = loadedCharts;
  }

  // Based on reporting-table.component.ts code

  private formatResponseToDataset(response: unknown, dimension: string): { x: string; y: number }[] {
    const data = [];
    Object.keys(response).filter(x => x !== '_total').forEach((key: string) => {
      data.push({
        y: response[key],
        x: this.getSiteOrGroupName(key, dimension)
      });
    });

    return data;
  }

  private getSiteOrGroupName(id: string, dimension: string): string {
    if (
      this.project &&
      (dimension === 'entity' ||
        dimension === 'group')
    ) {
      const site = this.project.entities.find(s => s.id === id);
      if (site !== undefined) {
        return site.name;
      }

      const group = this.project.groups.find(g => g.id === id);
      if (group !== undefined) {
        return group.name;
      }
    }
    if (id === '_total') {
      return 'Total';
    }
    if (
      dimension !== 'entity' &&
      dimension !== 'group'
    ) {
      const timeSlotAux = new TimeSlot(id);
      return timeSlotAux.humanizeValue(this.currentLang);
    }
    return id;
  }

  // Update all the table headers with the new dimensions
  private getLabels(dimension: string, filter: any): string[] {
    let dimensions: string[] = [];

    if (dimension === 'entity') {
      dimensions = JSON.parse(JSON.stringify(filter.entities));
    } else if (dimension === 'group') {
      const entities = filter.entities;
      dimensions = this.project.groups
        .filter(group => {
          for (const e of group.members) {
            if (entities.includes(e.id)) {
              return true;
            }
          }
          return false;
        })
        .map(x => x.id);
    } else {
      let startTimeSlot = TimeSlot.fromDate(
        filter._start,
        TimeSlotPeriodicity[dimension]
      );
      const endTimeSlot = TimeSlot.fromDate(
        filter._end,
        TimeSlotPeriodicity[dimension]
      );

      dimensions = [];
      while (startTimeSlot !== endTimeSlot) {
        dimensions.push(startTimeSlot.value);
        startTimeSlot = startTimeSlot.next();
      }
      dimensions.push(endTimeSlot.value);
    }
    return dimensions;
  }
}
