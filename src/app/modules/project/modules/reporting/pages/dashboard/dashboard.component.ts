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
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { CommentModalComponent } from './comment-modal/comment-modal.component';
import { DomSanitizer } from '@angular/platform-browser';
import InformationItem from 'src/app/models/interfaces/information-item';

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
  private userName: string;

  private _lastCachedTime: number = null;
  public get lastCachedTime() {
    return this._lastCachedTime;
  }
  public set lastCachedTime(time: number) {
    if (this._lastCachedTime === null || time < this._lastCachedTime || time === null) {
      this._lastCachedTime = time;
    }
  }

  private informations = [
    {
      res1: 'InformationPanel.Dashboard',
      res2: 'InformationPanel.Dashboard_description'
    } as InformationItem,
    {
      res1: 'InformationPanel.Dashboard_add_chart',
      res2: 'InformationPanel.Dashboard_add_chart_description'
    } as InformationItem,
    {
      res1: 'InformationPanel.Dashboard_refresh',
      res2: 'InformationPanel.Dashboard_refresh_description'
    } as InformationItem,
    {
      res1: 'InformationPanel.Dashboard_reorder',
      res2: 'InformationPanel.Dashboard_reorder_description'
    } as InformationItem,
    {
      res1: 'InformationPanel.Dashboard_analysis',
      res2: 'InformationPanel.Dashboard_analysis_description'
    } as InformationItem,
    {
      res1: 'InformationPanel.Dashboard_edit_delete',
      res2: 'InformationPanel.Dashboard_edit_delete_description'
    } as InformationItem,
    {
      res1: 'InformationPanel.Dashboard_empty',
      res2: 'InformationPanel.Dashboard_empty_description'
    } as InformationItem,
  ];


  constructor(
    private reportingService: ReportingService,
    private projectService: ProjectService,
    private translateService: TranslateService,
    private authService: AuthService,
    private dialog: MatDialog,
    private sanitizer: DomSanitizer
  ) {
  }

  public ngOnInit() {
    this.projectService.updateInformationPanel(this.informations);
    this.subscription.add(
      this.projectService.project.subscribe((project: Project) => {
        this.project = project;
        this.loadCharts(this.project.dashboard);
        const userSubscription = this.authService.currentUser.subscribe(
          (user: User) => {
            this.userName = user['name'];
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

  public reloadCache(): void {
    this.lastCachedTime = null;
    this.loadCharts(this.project.dashboard, true);
  }
  
    // drag and drop function on a list than can span accross multiple rows
  public drop(event: CdkDragDrop<any>): void {
    const projectCharts = this.project.dashboard;
    moveItemInArray(this.charts, event.previousIndex, event.currentIndex);
    moveItemInArray(projectCharts, event.previousIndex, event.currentIndex);
    this.projectService.setDashboard(projectCharts);
  }
  
  public removeAnalysis(id: string) {
    const project = this.project.dashboard.find(g => g.id === id);
    project.comment = null;
    this.projectService.setDashboard(this.project.dashboard);
    this.loadCharts(this.project.dashboard);
  }

  /**
   * Update a comment based on the action selected.
   */
  public updateAnalysis(id: string): void {
    const project = this.project.dashboard.find(g => g.id === id);
    const dialogSubscription = this.dialog
      .open(CommentModalComponent, {
        data: {
          action: project.comment ? 'edit' : 'add',
          comment: project.comment ? project.comment.content : null
        }
      })
      .afterClosed()
      .subscribe(result => {
        if (result !== undefined) {
          project.comment = {
            content: result,
            meta: {
              lastEditDate: new Date().toISOString(),
              lastEditUser: this.userName
            }
          };
          this.projectService.setDashboard(this.project.dashboard);
          this.loadCharts(this.project.dashboard);
        }
        dialogSubscription.unsubscribe();
      });
  }
  

  private async loadCharts(projectCharts: DashboardChart[], refreshCache = false) {
    const loadedCharts = [];
    for (const projectChart of projectCharts) {
      const chart = JSON.parse(JSON.stringify(projectChart));
      loadedCharts.push(chart);
      if (chart.comment) {
        chart.comment.content = this.sanitizer.bypassSecurityTrustHtml(chart.comment.content) as any;
      }
      // Get labels
      chart['labels'] = this.getLabels(chart.meta.dimension, chart.meta.filter).map(x => this.getSiteOrGroupName(x, chart.meta.dimension));
      for (const dataset of chart.datasets) {
        if (dataset.meta) {
          await this.reportingService
            .fetchData(
              this.project,
              dataset.meta.computation,
              [chart.meta.dimension],
              dataset.meta.filter,
              true,
              false,
              refreshCache
            )
            .then(response => {
              if (response) {
                if (response.cachedItems) {
                  response.cachedItems.forEach(item => this.lastCachedTime = item.time);
                }

                dataset['data'] = this.formatResponseToDataset(response.items, chart.meta.dimension);
                dataset['fill'] = false;
              }
            });
        }
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
