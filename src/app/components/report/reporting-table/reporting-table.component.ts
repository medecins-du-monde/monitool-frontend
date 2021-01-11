import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ProjectIndicator } from 'src/app/models/project-indicator.model';
import { Project } from 'src/app/models/project.model';
import { ProjectService } from 'src/app/services/project.service';
import TimeSlot from 'timeslot-dag';
import { TimeSlotPeriodicity } from 'src/app/utils/time-slot-periodicity';
import { isArray, round } from 'lodash';
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
  nextRow: Row;
  open: boolean;
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

  content: any;

  @Input() tableContent: BehaviorSubject<any[]>;
  @Input() dimensionIds: BehaviorSubject<string>;
  @Input() filter: BehaviorSubject<any>;
  rows = new BehaviorSubject<Row[]>([]);

  dataSource = new MatTableDataSource([]);


  private subscription: Subscription = new Subscription();

  project: Project;
  dimensions: string[];
  columnsToDisplay: any;
  openedSections = {};
  COLUMNS_TO_DISPLAY =  ['icon', 'name', 'baseline', 'target'];
  COLUMNS_TO_DISPLAY_GROUP = ['icon', 'groupName'];
  isSectionTitle = (index, item: any): item is SectionTitle => (item as SectionTitle).title ? true : false;
  isInfoRow = (index, item: any): item is InfoRow => (item as InfoRow).name ? true : false;
  isGroupTitle = (index, item: any): item is GroupTitle => (item as GroupTitle).groupName ? true : false;
  isProjectIndicator = (item: any): item is ProjectIndicator => (item as ProjectIndicator).display ? true : false;

  ngOnInit(): void {

    this.subscription.add(
      this.rows.subscribe(value => {
        this.dataSource = new MatTableDataSource(value.filter(row => this.isSectionTitle(0, row) || this.openedSections[row.sectionId]));
      })
    );

    this.subscription.add(
      this.projectService.openedProject.subscribe( (project: Project) => {
        this.project = project;
        this.updateDimensions();
        this.refreshValues();
        this.updateTableContent();
      })
    );

    this.subscription.add(
      this.dimensionIds.subscribe( () => {
        this.updateDimensions();
        this.refreshValues();
        this.updateTableContent();
      })
    );

    this.subscription.add(
      this.filter.subscribe( () => {
        this.updateDimensions();
        this.refreshValues();
        this.updateTableContent();
      })
    );

    this.subscription.add(
      this.tableContent.subscribe(content => {
        this.content = content;
        this.updateTableContent();
      })
    );
  }

  updateTableContent(): void{
    // TODO: Check why this.tableContent and not this.content
    if (this.project.id && this.tableContent && this.filter && this.dimensionIds && isArray(this.content)){
      let id = 0;

      for (const row of this.content){
        if (this.isSectionTitle(0, row)){
          id += 1;
          this.openedSections[id] = row.open;
        }
        row.sectionId = id;
      }

      this.content = this.content.map(this.convertToRow);
      this.rows.next(this.content);
    }
  }

  openSection(row: SectionTitle): void{
    row.open = !row.open;
    this.openedSections[row.sectionId] = row.open;
    this.updateTableContent();
  }

  // Create new row if it is an indicator
  convertToRow = (item: any) => {
    if (this.isProjectIndicator(item)){
      return this.indicatorToRow(item);
    }
    return item;
  }

  // table after dimension change
  updateDimensions(): void {
    if (this.dimensionIds.value === 'entity'){
      this.dimensions = JSON.parse(JSON.stringify(this.filter.value.entity));
      this.dimensions.push('_total');
    }
    else if (this.dimensionIds.value === 'group'){
      const entities = this.filter.value.entity;
      this.dimensions = this.project.groups.filter(group => {
        for (const e of group.members){
          if (entities.includes(e.id)){
            return true;
          }
        }
        return false;
      }).map(x => x.id);
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

  // Create row of the table from a ProjectIndicator
  indicatorToRow(indicator: ProjectIndicator): InfoRow{
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
      computation: indicator.computation,
      open: true
    } as InfoRow;

    if (this.project.id && this.tableContent && this.filter
        && this.dimensionIds && this.dimensions.length > 0){

      const currentFilter = this.filter.value;
      const modifiedFilter = {
        _start: currentFilter._start.toISOString().slice(0, 10),
        _end: currentFilter._end.toISOString().slice(0, 10),
        entity: currentFilter.entity
      };


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
    }
    return row;
  }

  // Fetch all data in function of project, content, filter, dimension and update table and chart
  refreshValues(): void{
    if (this.project.id && this.tableContent && this.filter
        && this.dimensionIds ){

      const currentFilter = this.filter.value;
      const modifiedFilter = {
        _start: currentFilter._start.toISOString().slice(0, 10),
        _end: currentFilter._end.toISOString().slice(0, 10),
        entity: currentFilter.entity
      };

      if (isArray(this.content)) {
        this.content.map( row => {
          if (this.isInfoRow(0, row)){
            if (this.dimensions.length > 0){
              this.reportingService.fetchData(this.project, row.computation, [this.dimensionIds.value] , modifiedFilter, true, false).then(
                response => {
                  if (response) {
                    this.roundResponse(response);
                    const data = this.formatResponseToDataset(response);
                    row.dataset = {
                      label: row.name,
                      data,
                      labels: Object.keys(response).map(x => this.getSiteOrGroupName(x)),
                      borderColor: this.randomColor(),
                      backgroundColor: this.randomColor(),
                      fill: false
                    };
                    row.values = response;

                    if (row.onChart){
                      this.updateChart();
                    }
                  }
                }
              );
            }
            // this only happens when you group by collection sites or by group and you don't have any site or group in your project
            else {
              row.values = {};
              row.dataset = {};
              if (row.onChart){
                this.updateChart();
              }
            }
          }
          return row;
        }
        );
      }
    }
  }

  getSiteOrGroupName(id: string){
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
  updateChart(element?: InfoRow): void{
    if (element){
      element.onChart = !element.onChart;
    }

    if (this.dimensionIds.value === 'entity' || this.dimensionIds.value === 'group'){
      this.chartService.changeType('bar');
    }else{
      this.chartService.changeType('line');
    }

    const datasets = [];
    // let labels = [];

    for (const row of this.dataSource.data){
      if (row.onChart){
        datasets.push(row.dataset);
        // this adds the dataset labels without having duplicate values
        // labels = labels.concat(row.dataset.labels.filter(key => labels.indexOf(key) < 0));
      }
    }
    const data = {
      labels: this.dimensions.filter(x => x !== '_total').map(x => this.getSiteOrGroupName(x)),
      datasets
    };
    this.chartService.addData(data);
  }

  // This allosws to round all values
  roundResponse(response): any{
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

  receiveIndicators(info): void{
    let indicatorIndex = this.content.indexOf(info.indicator);

    const currentIndicator = this.content[indicatorIndex];
    currentIndicator.open = !currentIndicator.open;

    currentIndicator.nextRow = this.content[indicatorIndex + 1];

    for (const disaggregatedIndicators of info.disaggregatedIndicators){
      indicatorIndex += 1;

      const newRow = this.indicatorToRow(disaggregatedIndicators);
      newRow.sectionId = info.indicator.sectionId;

      this.content.splice(indicatorIndex, 0, newRow);
      this.updateTableContent();
    }
  }

  collapseIndicators(info): void{
    const indicatorIndex = this.content.indexOf(info.indicator);
    const currentIndicator = this.content[indicatorIndex];
    currentIndicator.open = !currentIndicator.open;

    for (let i = indicatorIndex + 1; i < this.content.length; i += 1){
      if (this.content[i] === currentIndicator.nextRow){
        break;
      }
      this.content.splice(i, 1);
      i -= 1;
    }

    this.updateTableContent();
  }

  randomNumberLimit(limit): number {
    return Math.floor((Math.random() * limit) + 1);
  }
  randomColor(): string {
    const col = 'rgba(' + this.randomNumberLimit(255)
      + ',' + this.randomNumberLimit(255)
      + ',' + this.randomNumberLimit(255) + ', 1)';
    return col;
  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }
}


