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

  constructor(private projectService: ProjectService, private reportingService: ReportingService ) { }

  ngOnInit(): void {
    this.projectService.openedProject.subscribe((project: Project) => {
      this.project = project;
      const currentYear = project.start.getFullYear(); //we assume it is first day of year of the project start
      this.startDate = new Date(currentYear, 0, 1);
      this.collectionSites = project.entities;
      /* We need to forEach throught he project.logicalFrames || DataSources || ExtraIndicators...
      then we get all the indicators and attach them to the body to make the request 
      then we remove this dummy variable */
      console.log(project.extraIndicators);
      this.computation = project.logicalFrames[0].indicators[1].computation;
      console.log(this.computation);
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
