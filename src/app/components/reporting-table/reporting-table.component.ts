import { Component, ContentChild, Input, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ProjectIndicator } from 'src/app/models/project-indicator.model';
import { Project } from 'src/app/models/project.model';
import { ProjectService } from 'src/app/services/project.service';
import TimeSlot from 'timeslot-dag';
import { TimeSlotPeriodicity } from 'src/app/utils/time-slot-periodicity';
import { round } from 'lodash';
import { ReportingService } from 'src/app/services/reporting.service';
import { ChartService } from 'src/app/services/chart.service';

export interface SectionTitle{
  title: string;
  sectionId: number;
  open: boolean;
  click: (id: number) => void;
}

export interface GroupTitle{
  icon: boolean;
  groupName: string;
  sectionId: number;
}

export interface InfoRow {
  icon: boolean;
  name: string;
  baseline: number | null;
  target: number | null;
  sectionId: number;
  values: any;
  onChart?: boolean;
  dataset?: any;
  filterFlag: boolean;
  computation: any;
}

type Row = SectionTitle | GroupTitle | InfoRow;



@Component({
  selector: 'app-reporting-table',
  templateUrl: './reporting-table.component.html',
  styleUrls: ['./reporting-table.component.scss']
})
export class ReportingTableComponent implements OnInit, OnDestroy {

  constructor(private projectService: ProjectService,
              private reportingService: ReportingService,
              private chartService: ChartService) { }


  @Input() tableContent: BehaviorSubject<any[]>;
  @Input() dimensionIds: BehaviorSubject<string>;
  @Input() filter: BehaviorSubject<any>;
  rows = new BehaviorSubject<Row[]>([]);

  dataSource = new MatTableDataSource([]);


  private subscription: Subscription = new Subscription();

  project: Project;
  dimensions: string[];
  columnsToDisplay: any;
  openSections = {};
  COLUMNS_TO_DISPLAY =  ['icon', 'name', 'baseline', 'target'];
  COLUMNS_TO_DISPLAY_GROUP = ['icon', 'groupName'];
  isSectionTitle = (index, item: any): item is SectionTitle => (item as SectionTitle).title ? true : false;
  isInfoRow = (index, item: any): item is InfoRow => (item as InfoRow).name ? true : false;
  isGroupTitle = (index, item: any): item is GroupTitle => (item as GroupTitle).groupName ? true : false;
  isProjectIndicator = (item: any): item is ProjectIndicator => (item as ProjectIndicator).display ? true : false;

  ngOnInit(): void {

    this.subscription.add(
      this.rows.subscribe(value => {
        this.dataSource = new MatTableDataSource(value);
      })
    );

    this.subscription.add(
      this.projectService.openedProject.subscribe( (project: Project) => {
        this.project = project;
        this.updateTableContent();
      })
    );

    this.subscription.add(
      this.dimensionIds.subscribe(value => {
        this.fillDimensions();
        this.updateTableContent();
      })
    );

    this.subscription.add(
      this.filter.subscribe(value => {
        this.fillDimensions();
        this.updateTableContent();
      })
    );

    this.subscription.add(
      this.tableContent.subscribe(content => {
        this.updateTableContent();
      })
    );
  }

  updateTableContent(){
    if (this.project.id && this.tableContent && this.filter && this.dimensionIds){
      const content = this.tableContent.value;
      let id = 0;

      for (const row of content){
        if (this.isSectionTitle(0, row)){
          id += 1;
          this.openSections[id] = row.open;
        }
        row.sectionId = id;
      }

      this.rows.next(
        content
        .filter(row => this.isSectionTitle(0, row) || this.openSections[row.sectionId])
        .map(this.convertToRow)
      );
    }
  }

  openSection(row: SectionTitle){
    row.open = !row.open;
    this.openSections[row.sectionId] = row.open;
    this.updateTableContent();
  }

  convertToRow = (item: any) => {
    if (this.isProjectIndicator(item)){
      return this.indicatorToRow(item);
    }
    return item;
  }

  fillDimensions() {
    if (this.dimensionIds.value === 'entity'){
      this.dimensions = this.project.entities.map(x => x.id);
      this.dimensions.push('_total');
    }
    else if (this.dimensionIds.value === 'group'){
      this.dimensions = this.project.groups.map(x => x.id);
    }
    else {
      let startTimeSlot = TimeSlot.fromDate(this.filter.value._start, TimeSlotPeriodicity[this.dimensionIds.value]);
      const endTimeSlot = TimeSlot.fromDate(this.filter.value._end, TimeSlotPeriodicity[this.dimensionIds.value]);

      this.dimensions = [];
      while (startTimeSlot !== endTimeSlot){
        this.dimensions.push(startTimeSlot.value);
        startTimeSlot = startTimeSlot.next();
      }
      this.dimensions.push(endTimeSlot.value);
      this.dimensions.push('_total');

    }

    this.columnsToDisplay = this.COLUMNS_TO_DISPLAY.concat(this.dimensions);
  }


  indicatorToRow(indicator: ProjectIndicator): InfoRow{
    const currentFilter = this.filter.value;
    const modifiedFilter = {
      _start: currentFilter._start.toISOString().slice(0, 10),
      _end: currentFilter._end.toISOString().slice(0, 10),
      entity: currentFilter.entity
    };

    const row = {
      icon: true,
      name: indicator.display,
      baseline: indicator.baseline,
      target: indicator.target,
      sectionId: 0,
      values: {},
      onChart: false,
      dataset: {},
      filterFlag: true,
      computation: indicator.computation
    } as InfoRow;


    this.reportingService.fetchData(this.project, indicator.computation, [this.dimensionIds.value] , modifiedFilter, true, false).then(
      response => {

        if (response) {
          this.roundResponse(response);
          const data = this.formatResponseToDataset(response);
          row.dataset = {
          label: indicator.display,
          data,
          labels: Object.keys(response).map(x => this.getSiteOrGroupName(x)),
          borderColor: this.randomColor(),
          backgroundColor: this.randomColor(),
          fill: false
        };
          row.values = response;
        }
      }
    );


    return row;
  }

  getSiteOrGroupName(id){
    if (this.project && (this.dimensionIds.value === 'entity' ||  this.dimensionIds.value === 'group')){
      const site = this.project.entities.find(s => s.id === id);
      if (site !== undefined){
        return site.name;
      }

      const group = this.project.groups.find(g => g.id === id);
      if (group !== undefined){
        return group.name;
      }
    }
    return id;
  }

  // this method builds the chart again everytime there is a click in the chart button
  updateChart(element: InfoRow){
    element.onChart = !element.onChart;

    const datasets = [];
    let labels = [];

    for (const row of this.dataSource.data){
      if (row.onChart){
        datasets.push(row.dataset);
        // this adds the dataset labels without having duplicate values
        labels = labels.concat(row.dataset.labels.filter(key => labels.indexOf(key) < 0));
      }
    }
    const data = {
      // labels,
      labels: this.dimensions.filter(x => x !== '_total').map(x => this.getSiteOrGroupName(x)),
      datasets
    };

    this.chartService.addData(data);

    if (this.dimensionIds.value === 'entity' || this.dimensionIds.value === 'group'){
      this.chartService.changeType('bar');
    }else{
      this.chartService.changeType('line');
    }

  }

  roundResponse(response){
    for (const [key, value] of Object.entries(response)) {
      response[key] = round(value as number);
    }
    return response;
  }

  formatResponseToDataset(response){
    const data = [];
    for (const [key, value] of Object.entries(response)) {
      if (key !== '_total'){
        data.push({
          y: value,
          x: key
        });
      }
    }
    return data;
  }

  randomNumberLimit(limit) {
    return Math.floor((Math.random() * limit) + 1);
  }
  randomColor() {
    const col = 'rgba(' + this.randomNumberLimit(255)
      + ',' + this.randomNumberLimit(255)
      + ',' + this.randomNumberLimit(255) + ', 1)';
    return col;
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}


