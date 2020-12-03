import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project.model';
import { ProjectService } from 'src/app/services/project.service';
import { ReportingService } from 'src/app/services/reporting.service';

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
  data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [{
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 1)',
        fill: false,
    }]
  };
  /*--------------------------*/

  constructor(private projectService: ProjectService, private reportingService: ReportingService ) { }

  ngOnInit(): void {
    this.projectService.openedProject.subscribe((project: Project) => {
      this.project = project;
      const currentYear = project.start.getFullYear(); //we assume it is first day of year of the project start
      this.startDate = new Date(currentYear, 0, 1);
      this.collectionSites = project.entities;
      /* We need to forEach throught he project.logicalFrames || DataSources || ExtraIndicators...
      then we get all the indicators and attach them to the body to make the request once clicked on the plus
      then we remove this dummy variable */
      console.log(this.project.logicalFrames[0].purposes);
      this.computation = project.logicalFrames[0].purposes[0].indicators[0].computation;
    });


  }

  setGrouping(event) {
    this.grouping = [event.value];
  }

  setFilter(event) {
    this.filter = event;
  }

  makeRequest(){
    this.reportingService.fetchData(this.project, this.computation, this.grouping, this.filter, true, true);
  }

}
