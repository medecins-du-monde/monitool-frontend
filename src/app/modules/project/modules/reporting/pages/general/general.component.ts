import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project.model';
import { ProjectService } from 'src/app/services/project.service';
import { ReportingService } from 'src/app/services/reporting.service';
import { ChartService } from 'src/app/services/chart.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss'],
})

export class GeneralComponent implements OnInit {

  constructor(private projectService: ProjectService,
              private reportingService: ReportingService,
              private chartService: ChartService,
              private fb: FormBuilder ) { }

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

  // dimensions = ['2020-Q3', '2020-Q4', '2021-Q1', '2021-Q2',	'2021-Q3', '2021-Q4', 'Total'];
  dimensions = ['2020-S2', '2021-S1', '2021-S2', 'Total'];

  addDataToGraph(data) {
    this.chartService.addData(data);
  }

  addDatasetToGraph(data) {
    this.chartService.addDataset(data);
  }

  ngOnInit(): void {
    this.projectService.openedProject.subscribe((project: Project) => {
      this.project = project;
      const currentYear = project.start.getFullYear(); // we assume it is first day of year of the project start
      this.startDate = new Date(currentYear, 0, 1);
      this.collectionSites = project.entities;
      /* We need to forEach throught he project.logicalFrames || DataSources || ExtraIndicators...
      then we get all the indicators and attach them to the body to make the request once clicked on the plus
      then we remove this dummy variable */
      if (project.logicalFrames.length > 0 ) {
        if (project.logicalFrames[0].indicators[0]) {
          this.computation = project.logicalFrames[0].indicators[0].computation;
        }
      }
    });

    this.requestForm = this.fb.group({
      project: this.project,
      computation: this.computation,
      grouping: this.grouping,
      filter: this.filter,
    });
  }

  async makeRequest(){
    const tempFilter = this.requestForm.value.filter;
    const grouping = [this.requestForm.value.grouping];
    // TODO: Check if withGroup should be true sometimes
    const response = await this.reportingService.fetchData(this.project, this.computation, grouping , tempFilter, true, false);
    if (response){
      this.addDataToGraph(this.responseToGraphData(response, 'get label from current data'));
    }
  }

  responseToGraphData(response, label) {
    let grouping = this.requestForm.value.grouping[0];
    let idToName = false;
    if (grouping === 'group') {
      grouping = 'groups';
      idToName = true;
    }
    if (grouping === 'entity') {
      grouping = 'entities';
      idToName = true;
    }

    let labels = [];
    const keys = Object.keys(response);
    if (idToName) {
      keys.forEach(key => {
        this.project[grouping].find(
          group => {
            group.id === key ? labels.push(group.name) : null;
            key === '_total' ? labels.push(key) : null;
            });
          });
    } else {
      labels = keys;
    }

    const data = {
      labels,
      datasets: [{
          label,
          data: Object.values(response),
          borderColor: 'rgba(255, 99, 132, 1)',
          backgroundColor: 'rgba(255, 99, 132, 1)',
          fill: false,
      }]
    };
    return data;
  }

  setGrouping(event) {
    this.grouping = [event.value];
  }

}


