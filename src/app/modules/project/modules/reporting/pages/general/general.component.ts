import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project.model';
import { ProjectService } from 'src/app/services/project.service';
import { ReportingService } from 'src/app/services/reporting.service';
import { ChartService } from 'src/app/services/chart.service';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})

export class GeneralComponent implements OnInit {

  protected project: Project;
  grouping = ['semester'];
  filter: object[];
  startDate: Date;
  collectionSites: object;
  computation: object;


  /*examplatory data to test if chart components accepts input*/
  chartType = 'line';
  options =  {fill: false};
  data;
  /*--------------------------*/

  constructor(private projectService: ProjectService,
              private reportingService: ReportingService,
              private chartService: ChartService ) { }

  ngOnInit(): void {
    this.projectService.openedProject.subscribe((project: Project) => {
      this.project = project;
      const currentYear = project.start.getFullYear(); //we assume it is first day of year of the project start
      this.startDate = new Date(currentYear, 0, 1);
      this.collectionSites = project.entities;
      /* We need to forEach throught he project.logicalFrames || DataSources || ExtraIndicators...
      then we get all the indicators and attach them to the body to make the request once clicked on the plus
      then we remove this dummy variable */
      console.log(this.project.logicalFrames[0].purposes[0].indicators[0]);
      this.computation = project.logicalFrames[0].indicators[0].computation;
    });

    //this.chartService.dataset.subscribe(data => this.data = data);
  }

  setGrouping(event) {
    this.grouping = [event.value];
  }

  setFilter(event) {
    this.filter = event;
  }

  async makeRequest(){
    const response = await this.reportingService.fetchData(this.project, this.computation, this.grouping, this.filter, true, true);
    this.responseToGraphData(response);
  }

  responseToGraphData(response) {
    const data = {
      labels: Object.keys(response),
      datasets: [{
          label: this.project.logicalFrames[0].purposes[0].indicators[0].display,
          data: Object.values(response),
          borderColor: 'rgba(255, 99, 132, 1)',
          backgroundColor: 'rgba(255, 99, 132, 1)',
          fill: false,
      }]
    };
    this.chartService.addDataset(data);
  }

}
