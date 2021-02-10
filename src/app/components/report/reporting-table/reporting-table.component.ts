// tslint:disable: variable-name
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ProjectIndicator } from 'src/app/models/classes/project-indicator.model';
import { Project } from 'src/app/models/classes/project.model';
import { ProjectService } from 'src/app/services/project.service';
import TimeSlot from 'timeslot-dag';
import { TimeSlotPeriodicity, TimeSlotOrder } from 'src/app/utils/time-slot-periodicity';
import { isArray, isNaN, round } from 'lodash';
import { ReportingService } from 'src/app/services/reporting.service';
import { ChartService } from 'src/app/services/chart.service';
import { AddedIndicators } from 'src/app/components/report/reporting-menu/reporting-menu.component';
import { Filter } from 'src/app/components/report/filter/filter.component';

// TODO: Stock these interfaces in their own file
export interface SectionTitle{
  title: string;
  sectionId: number;
  open: boolean;
  click: (id: number) => void;
  level: number;
}

export interface GroupTitle{
  icon: boolean;
  groupName: string;
  sectionId: number;
  level: number;
}

export interface InfoRow {
  icon: boolean;
  name: string;
  baseline: number | null;
  colorize?: boolean;
  target: number | null;
  sectionId: number;
  values: any;
  onChart?: boolean;
  dataset?: any;
  filterFlag: boolean;
  computation: any;
  originProject?: Project;
  customFilter?: any;
  nextRow: Row;
  open: boolean;
  level: number;
  error?: string;
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

  content: any[];

  @Input() tableContent: BehaviorSubject<any[]>;
  @Input() dimensionIds: BehaviorSubject<string>;
  @Input() filter: BehaviorSubject<Filter>;
  rows = new BehaviorSubject<Row[]>([]);

  dataSource = new MatTableDataSource([]);


  private subscription: Subscription = new Subscription();

  project: Project;
  dimensions: string[];
  columnsToDisplay: string[];
  openedSections = {0: true};
  COLUMNS_TO_DISPLAY =  ['icon', 'name', 'baseline', 'target'];
  COLUMNS_TO_DISPLAY_ERROR =  ['icon', 'name', 'baseline', 'target', 'error'];
  COLUMNS_TO_DISPLAY_GROUP = ['icon', 'groupName'];
  isSectionTitle = (_index: number, item: Row): item is SectionTitle => (item as SectionTitle).title ? true : false;
  isInfoRow = (_index: number, item: Row): item is InfoRow => (item as InfoRow).name ? true : false;
  isGroupTitle = (_index: number, item: Row): item is GroupTitle => (item as GroupTitle).groupName ? true : false;
  isProjectIndicator = (item: unknown): item is ProjectIndicator => (item as ProjectIndicator).display ? true : false;

  isInfoRowError = (_index: number, item: Row): boolean => (this.isInfoRow(_index, item) && item.error !== undefined)
  isInfoRowNoError = (_index: number, item: Row): boolean => (this.isInfoRow(_index, item) && item.error === undefined)

  ngOnInit(): void {
    this.subscription.add(
      this.rows.subscribe(value => {

        const filteredRows = value.filter(row => {
          if (this.isSectionTitle(0, row)){
            return true;
          }

          if (this.openedSections[row.sectionId]){
            if (this.isInfoRow(0, row)) {
              if (row.originProject){
                if (this.filter.value.finished){
                  return row.originProject.status === 'Ongoing' || row.originProject.status === 'Finished';
                } else {
                  return row.originProject.status === 'Ongoing';
                }
              }
            }
            return true;
          } else {
            return false;
          }
        });
        this.dataSource = new MatTableDataSource(filteredRows);
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
    if (this.tableContent && this.filter && this.dimensionIds && isArray(this.content)){
      let id = 0;

      this.content = this.content.map(this.convertToRow);

      for (const row of this.content){
        if (this.isSectionTitle(0, row)){
          id += 1;
          this.openedSections[id] = row.open;
        }
        row.sectionId = id;
      }

      this.content = this.content.map(this.convertToRow);
      // defines the level of the first row as zero if it is undefined
      if (this.content.length > 0){
        if (this.content[0].level === undefined){
          this.content[0].level = 0;
        }
      }
      // if any row has the level undefined, it gets the level of the previous row
      for (let i = 1; i < this.content.length; i += 1){
        if (this.content[i].level === undefined){
          this.content[i].level = this.content[i - 1].level;
        }
      }
      this.rows.next(this.content);
    }
  }

  openSection(row: SectionTitle): void{
    row.open = !row.open;
    this.openedSections[row.sectionId] = row.open;
    this.updateTableContent();
  }

  // Create new row if it s an indicator
  convertToRow = (item: Row | ProjectIndicator): Row => {
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
  indicatorToRow(indicator: ProjectIndicator, customFilter?: undefined): InfoRow{
    let row = {
      icon: true,
      name: indicator.display,
      baseline: indicator.baseline,
      colorize: indicator.colorize !== undefined ? indicator.colorize : false,
      target: indicator.target,
      sectionId: 0,
      values: {},
      onChart: false,
      dataset: {},
      filterFlag: true,
      computation: indicator.computation,
      originProject: indicator.originProject ? indicator.originProject : undefined,
      open: true
    } as InfoRow;

    if (customFilter){
      row.customFilter = customFilter;
    }

    if (this.tableContent && this.filter && this.dimensionIds && this.dimensions.length > 0){
      row = this.updateRowValues(row);
    }
    return row;
  }
  // Fetch the data of one especific row in function of project, content, filter and dimension
  updateRowValues(row: InfoRow): InfoRow{
    const currentFilter = this.filter.value;
    const modifiedFilter = {
      _start: currentFilter._start.toISOString().slice(0, 10),
      _end: currentFilter._end.toISOString().slice(0, 10),
      entity: currentFilter.entity
    };

    const currentProject = row.originProject ? row.originProject : this.project;
    const customFilter = JSON.parse(JSON.stringify(modifiedFilter));
    if (row.customFilter){
      Object.assign(customFilter, row.customFilter);
    }

    
    if (this.checkPeriodicityIsValid(row)){
      this.reportingService.fetchData(currentProject, row.computation, [this.dimensionIds.value] , customFilter, true, false).then(
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

    return row;
  }
  checkPeriodicityIsValid(row: InfoRow): boolean{
    if (!row.computation) {
      row.error = 'Calculation is missing';
      return false;
    }

    for (const [key, value] of Object.entries(row.computation.parameters)){
      console.log(key, value);
    }
    return true;
  }

  // Fetch all data in function of project, content, filter, dimension and update table and chart
  refreshValues(): void{
    if (this.tableContent && this.filter && this.dimensionIds ){

      if (isArray(this.content)) {
        this.content.map( row => {
          if (this.isInfoRow(0, row)){
            if (this.dimensions.length > 0){
              row = this.updateRowValues(row);
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
          // this only happens when you group by collection sites or by group and you don't have any site or group in your project
          else {
            row.values = {};
            row.dataset = {};
            if (row.onChart){
              this.updateChart();
            }
          }
          return row;
        });
      }

    }
  }

  getSiteOrGroupName(id: string): string{
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

    for (const row of this.dataSource.data){
      if (row.onChart){
        datasets.push(Object.assign({}, row.dataset));
      }
    }
    const data = {
      labels: this.dimensions.filter(x => x !== '_total').map(x => this.getSiteOrGroupName(x)),
      datasets
    };
    this.chartService.addData(data);
  }

  // This allows to round all values
  roundResponse(response: unknown): unknown{
    for (const [key, value] of Object.entries(response)) {
      response[key] = value === null ? null : round(value as number);
    }
    return response;
  }

  formatResponseToDataset(response: unknown): {x: string, y: number}[]{
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

  receiveIndicators(info: AddedIndicators): void{
    let indicatorIndex = this.content.indexOf(info.indicator);

    const currentIndicator = this.content[indicatorIndex];
    const currentProject = currentIndicator.originProject ? currentIndicator.originProject : this.project;
    currentIndicator.nextRow = this.content[indicatorIndex + 1];

    if (info.splitBySites){
      const newIndicators = [];
      const entities = info.indicator.originProject ? info.indicator.originProject.entities.map(x => x.id) : this.filter.value.entity;

      for (const entityId of entities){
        const customFilter = {
          entity: [entityId]
        };

        let customIndicator = Object.assign({}, info.indicator) as InfoRow;

        customIndicator.level = info.indicator.level + 1;
        customIndicator.onChart = false;
        customIndicator.name = currentProject.entities.find(x => x.id === entityId)?.name;
        customIndicator.customFilter = customFilter;
        customIndicator.values = {};

        customIndicator = this.updateRowValues(customIndicator);

        newIndicators.push(customIndicator);
      }

      this.content.splice(indicatorIndex + 1, 0, ...newIndicators);

      currentIndicator.open = !currentIndicator.open;
      this.updateTableContent();
    }

    else if (info.splitByTime){
      let startTimeSlot = TimeSlot.fromDate(this.filter.value._start, TimeSlotPeriodicity[info.splitByTime]);
      let endTimeSlot = TimeSlot.fromDate(this.filter.value._end, TimeSlotPeriodicity[info.splitByTime]);
      endTimeSlot = endTimeSlot.next();

      const newIndicators = [];

      while (startTimeSlot !== endTimeSlot){
        let customIndicator = JSON.parse(JSON.stringify(info.indicator)) as InfoRow;

        customIndicator.level = info.indicator.level + 1;
        // TO DO: add correct language here
        customIndicator.name = startTimeSlot.humanizeValue('en');
        customIndicator.values = {};

        if (!customIndicator.customFilter){
          customIndicator.customFilter = {};
        }
        customIndicator.customFilter[info.splitByTime] = [startTimeSlot.value];

        customIndicator = this.updateRowValues(customIndicator);
        newIndicators.push(customIndicator);

        startTimeSlot = startTimeSlot.next();
      }
      this.content.splice(indicatorIndex + 1, 0, ...newIndicators);

      currentIndicator.open = !currentIndicator.open;
      this.updateTableContent();
    }
    else {
      for (const disaggregatedIndicator of info.disaggregatedIndicators){
        indicatorIndex += 1;

        let newRow;
        if (currentIndicator.customFilter){
          newRow = this.indicatorToRow(disaggregatedIndicator, currentIndicator.customFilter);
        }
        else{
          newRow = this.indicatorToRow(disaggregatedIndicator);
        }
        newRow.sectionId = info.indicator.sectionId;
        newRow.level = info.indicator.level + 1;

        this.content.splice(indicatorIndex, 0, newRow);
      }
      currentIndicator.open = !currentIndicator.open;
      this.updateTableContent();
    }
  }

  collapseIndicators(info: {indicator: InfoRow}): void{
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
    this.updateChart();
  }

  calcPaddingLevel(element: Row): string{
    if (element.level){
      return `padding-left: ${element.level * 20 + 15}px;`;
    }
    return '';
  }

  calcColor(element: InfoRow, column: string): string{
    // the colors change in the following way:
    // we start in the red: rgb(255, 128, 128)
    // we go up increasing the value of the blue
    // until we reach the yellow: rgb (255, 128, 128)
    // after this we go down subtracting the value
    // of the red until we get to the green: rgb (128, 255, 128)


    // set color to gray if cell is empty
    if (!element.values[column] && !this.checkIfNaN(element?.values[column])){
      return 'rgb(238, 238, 238)';
    }

    // don't set any color if the row don't want colors or the value is NaN
    if (!element.colorize || this.checkIfNaN(element?.values[column])){
      return ''
    }
    
    const distance = element.target - element.baseline;

    let r = 255;
    let g = 128;
    const b = 128;
  
    // if the value is lower than the baseline, we choose red
    if (element.values[column] <= element.baseline){
      r = 255;
      g = 128;
    }
    // if it is higher than the target, we choose green
    else if (element.values[column] >= element.target){
      g = 255;
      r = 128;
    }
    // if it is somewhere in between, we calculate where and choose accordingly
    else {
      const myPosition = element.values[column] - element.baseline;
      const normalizedDifference = (myPosition / distance) * 255;
      if (normalizedDifference <= 127){
        g += normalizedDifference;
      }else{
        g = 255;
        r -= (normalizedDifference - 127);
      }
    }

    if (distance < 0){
      const aux = g;
      g = r;
      r = aux
    }

    return `rgb(${r}, ${g}, ${b})`;
  }

  randomNumberLimit(limit: number): number {
    return Math.floor((Math.random() * limit) + 1);
  }

  randomColor(): string {
    const col = 'rgba(' + this.randomNumberLimit(255)
      + ',' + this.randomNumberLimit(255)
      + ',' + this.randomNumberLimit(255) + ', 1)';
    return col;
  }

  checkIfNaN(x: unknown): boolean{
    return isNaN(x);
  }
  
  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }
}