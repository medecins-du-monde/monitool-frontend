import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project.model';
import { ProjectService } from 'src/app/services/project.service';
import { ReportingService } from 'src/app/services/reporting.service';
import { ChartService } from 'src/app/services/chart.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import _ from 'lodash';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss'],
})

export class GeneralComponent implements OnInit {
  endDate: Date;

  constructor(private projectService: ProjectService,
              private reportingService: ReportingService,
              private chartService: ChartService,
              private fb: FormBuilder ) { }

  protected project: Project;
  grouping = '';
  
  filter = new BehaviorSubject<any>({});
  
  dimensionIds = new BehaviorSubject('');

  startDate: Date;
  collectionSites: object;
  computation: object;
  requestForm: FormGroup;

  // initial values for the chart
  options =  {fill: false};
  data = {};

  addDataToGraph(data) {
    this.chartService.addData(data);
  }

  addDatasetToGraph(data) {
    this.chartService.addDataset(data);
  }

  ngOnInit(): void {
  
    this.projectService.openedProject.subscribe((project: Project) => {
      this.project = project;

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

  }

  get chartData(){
    return this.chartService.data.value;
  }

  async makeRequest(){
    // we have to pass dates to strings in the YYYY-mm-dd format
    // let modifiedFilter = this.filter.value

    const currentFilter = this.filter.value;
    let modifiedFilter = {
      _start: currentFilter._start.toISOString().slice(0, 10),
      _end: currentFilter._end.toISOString().slice(0, 10),
      entity: currentFilter.entity
    };

    // TODO: Check if withGroup should be true sometimes
    const response = await this.reportingService.fetchData(this.project, this.computation, [this.grouping] , modifiedFilter, true, false);
    if (response){
      this.addDataToGraph(this.responseToGraphData(response, 'get label from current data'));
    }
  }

  responseToGraphData(response, label) {
    let grouping = _.clone(this.grouping);
    
    let idToName = false;
    if (this.grouping === 'group') {
      grouping = 'groups';
      idToName = true;
    }
    if (this.grouping === 'entity') {
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
      datasets: [
        {
          label,
          data: Object.values(response),
          borderColor: 'rgba(255, 99, 132, 1)',
          backgroundColor: 'rgba(255, 99, 132, 1)',
          fill: false,
        },
      ]
    };
    return data;
  }

  receiveFilter(value){
    this.filter.next(value);
  }

  receiveDimension(value){
    this.dimensionIds.next(value);
    this.grouping = value;
  }

}


