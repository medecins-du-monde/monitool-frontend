import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { Project } from 'src/app/models/classes/project.model';
import { DashboardService } from 'src/app/services/dashboard.service';
import { ProjectService } from 'src/app/services/project.service';
import { ReportingService } from 'src/app/services/reporting.service';
import TimeSlot from 'timeslot-dag';

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
  public graphs = [];

  private subscription = new Subscription();

  constructor(
    private dashboardService: DashboardService,
    private reportingService: ReportingService,
    private projectService: ProjectService,
    private translateService: TranslateService,
  ) {
    this.subscription.add(
      this.projectService.openedProject.subscribe((project: Project) => {
        this.project = project;
        // this.entities = this.project.entities;
        // this.indicatorService
        //   .listForProject(this.project.themes.map(x => x.id))
        //   .then((crosscutting: Indicator[]) => {
        //     this.crosscutting = crosscutting;
        //     this.buildIndicators();
        //   });
      })
    );
    const graphs = this.dashboardService.getGraphs();
    for (const graph of graphs) {
      for (const dataset of graph.datasets) {
        this.reportingService
          .fetchData(
            this.project,
            dataset.meta.computation,
            [graph.dimension],
            dataset.meta.filter,
            true,
            false,
            false
          )
          .then(response => {
            if (response) {
              const data = this.formatResponseToDataset(response.items, graph.dimension);
              console.log(data);
            }
          });
        }
    }
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
}
