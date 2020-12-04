import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project.model';
import { ProjectService } from 'src/app/services/project.service';
import { ReportingService } from 'src/app/services/reporting.service';
import { ChartService } from 'src/app/services/chart.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

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
  requestForm: FormGroup;


  chartType = 'line';
  options =  {fill: false};
  data;


  constructor(private projectService: ProjectService,
              private reportingService: ReportingService,
              private chartService: ChartService,
              private fb: FormBuilder ) { }

  ngOnInit(): void {
    this.projectService.openedProject.subscribe((project: Project) => {
      this.project = project;
      const currentYear = project.start.getFullYear(); //we assume it is first day of year of the project start
      this.startDate = new Date(currentYear, 0, 1);
      this.collectionSites = project.entities;
      /* We need to forEach throught he project.logicalFrames || DataSources || ExtraIndicators...
      then we get all the indicators and attach them to the body to make the request once clicked on the plus
      then we remove this dummy variable */
      this.computation = project.logicalFrames[0].indicators[0].computation;
    });

    this.requestForm = this.fb.group({
      project: this.project,
      computation: this.computation,
      grouping: this.grouping,
      filter: this.filter,
    });
  }

  setGrouping(event) {
    this.grouping = [event.value];
  }


  async makeRequest(){
    const tempFilter = this.requestForm.value.filter;
    const grouping = [this.requestForm.value.grouping];
    const response = await this.reportingService.fetchData(this.project, this.computation, grouping , tempFilter, true, true);
    this.addDataToGraph(this.responseToGraphData(response, 'get label from current data'));
  }

  responseToGraphData(response, label) {
    const data = {
      labels: Object.keys(response),
      datasets: [{
          label: label,
          data: Object.values(response),
          borderColor: 'rgba(255, 99, 132, 1)',
          backgroundColor: 'rgba(255, 99, 132, 1)',
          fill: false,
      }]
    };
    return data;
  }

  addDataToGraph(data) {
    this.chartService.addData(data);
  }

  addDatasetToGraph(data) {
    this.chartService.addDataset(data);
  }

}
