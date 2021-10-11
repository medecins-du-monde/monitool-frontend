// tslint:disable: variable-name
// tslint:disable:no-string-literal
import { Component, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject, Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { PERCENTAGE_FORMULA, ProjectIndicator } from 'src/app/models/classes/project-indicator.model';
import { Project } from 'src/app/models/classes/project.model';
import { ProjectService } from 'src/app/services/project.service';
import TimeSlot from 'timeslot-dag';
import { TimeSlotPeriodicity, TimeSlotOrder } from 'src/app/utils/time-slot-periodicity';
import { isArray, isNaN, round } from 'lodash';
import { ReportingService } from 'src/app/services/reporting.service';
import { ChartService } from 'src/app/services/chart.service';
import { AddedIndicators } from 'src/app/models/interfaces/report/added-indicators.model';
import { Filter } from 'src/app/components/report/filter/filter.component';
import DatesHelper from 'src/app/utils/dates-helper';
import { InfoRow } from 'src/app/models/interfaces/report/rows/info-row.model';
import { SectionTitle } from 'src/app/models/interfaces/report/rows/section-title.model';
import { GroupTitle } from 'src/app/models/interfaces/report/rows/group-title.model';

type Row = SectionTitle | GroupTitle | InfoRow;

@Component({
  selector: 'app-reporting-table',
  templateUrl: './reporting-table.component.html',
  styleUrls: ['./reporting-table.component.scss']
})
export class ReportingTableComponent implements OnInit, OnDestroy {

  constructor(private projectService: ProjectService,
              private reportingService: ReportingService,
              private chartService: ChartService,
              private translateService: TranslateService) { }

  get optimalColspanForGroupName(): number {
    return Math.min(this.columnsToDisplay.length - 2, this.colsThatFitInTheScreen);
  }

  get currentLang(): string {
    return this.translateService.currentLang ? this.translateService.currentLang : this.translateService.defaultLang;
  }

  @Input() tableContent: BehaviorSubject<any[]>;
  @Input() dimensionIds: BehaviorSubject<string>;
  @Input() filter: BehaviorSubject<Filter>;
  @Input() isCrossCuttingReport = false;
  rows = new BehaviorSubject<Row[]>([]);

  dataSource = new MatTableDataSource([]);

  COLORS = [
    '#1f77b4',
    '#ff7f0e',
    '#2ca02c',
    '#d62728',
    '#9467bd',
    '#8c564b',
    '#e377c2',
    '#7f7f7f',
    '#bcbd22',
    '#17becf',
  ];

  currentColorIndex = 0;
  innerWidth: number;
  colsThatFitInTheScreen: number;

  private subscription: Subscription = new Subscription();

  // These values are used to check if the value changed in the subscribe
  currentDimension: string;
  currentFilter: any;
  content: any[];
  project: Project;

  dimensions: string[];
  columnsToDisplay: string[];
  openedSections = { 0: true };
  COLUMNS_TO_DISPLAY = ['icon', 'name', 'baseline', 'target'];
  COLUMNS_TO_DISPLAY_ERROR = ['icon', 'name', 'baseline', 'target', 'error'];
  COLUMNS_TO_DISPLAY_TITLE = ['title', 'title_stick'];
  COLUMNS_TO_DISPLAY_GROUP = ['icon', 'groupName', 'group_stick'];

  @HostListener('window:resize', ['$event'])
  onResize(event): void {
    this.calculateOptimalColspan();
  }
  isSectionTitle = (_index: number, item: Row): item is SectionTitle => (item as SectionTitle).title ? true : false;
  isInfoRow = (_index: number, item: Row): item is InfoRow => (item as InfoRow).name ? true : false;
  isGroupTitle = (_index: number, item: Row): item is GroupTitle => (item as GroupTitle).groupName ? true : false;
  isProjectIndicator = (item: unknown): item is ProjectIndicator => (item as ProjectIndicator).display ? true : false;

  isInfoRowError = (_index: number, item: Row): boolean => (this.isInfoRow(_index, item) && item.error !== undefined);
  isInfoRowNoError = (_index: number, item: Row): boolean => (this.isInfoRow(_index, item) && item.error === undefined);

  ngOnInit(): void {
    this.calculateOptimalColspan();
    this.subscription.add(
      this.rows.subscribe(value => {

        const filteredRows = value.filter(row => {
          if (this.isSectionTitle(0, row)) {
            return true;
          }

          if (this.openedSections[row.sectionId]) {
            if (this.isInfoRow(0, row)) {
              if (row.originProject) {
                if (this.filter.value.finished) {
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

    if (!this.isCrossCuttingReport) {
      // Project loaded twice
      this.subscription.add(
        this.projectService.openedProject.subscribe((project: Project) => {
          if (JSON.stringify(this.project) !== JSON.stringify(project)) {
            this.project = project;
            this.updateDimensions();
            this.refreshValues();
            this.updateTableContent();
          }
        })
      );
    }

    this.subscription.add(
      this.dimensionIds.subscribe(newDimension => {
        if (this.currentDimension !== newDimension) {
          this.currentDimension = newDimension;
          this.updateDimensions();
          this.refreshValues();
          this.updateTableContent();
        }
      })
    );

    this.subscription.add(
      this.filter.subscribe(newFilter => {
        if (JSON.stringify(this.currentFilter) !== JSON.stringify(newFilter)) {
          this.currentFilter = newFilter;
          this.updateDimensions();
          this.refreshValues();
          this.updateTableContent();
        }
      })
    );

    this.subscription.add(
      this.tableContent.subscribe(newContent => {
        if (JSON.stringify(this.content) !== JSON.stringify(newContent)) {
          this.content = newContent;
          this.updateTableContent();
        }
      })
    );

    this.subscription.add(
      this.chartService.reset.subscribe(reset => {
        if (reset) {
          const updatedRows = this.rows.getValue();
          updatedRows.forEach(row => {
            if (this.isInfoRow(0, row)) {
              row.onChart = false;
            }
          }
          );
          this.rows.next(updatedRows);
        }
      })
    );
  }

  updateTableContent(): void {
    // TODO: Check why this.tableContent and not this.content
    if (this.tableContent && this.filter && this.dimensionIds && isArray(this.content)) {
      let id = 0;

      this.content = this.content.map(this.convertToRow);

      for (const row of this.content) {
        if (this.isSectionTitle(0, row)) {
          id += 1;
          this.openedSections[id] = row.open;
        }
        row.sectionId = id;
      }

      // defines the level of the first row as zero if it is undefined
      if (this.content.length > 0) {
        if (this.content[0].level === undefined) {
          this.content[0].level = 0;
        }
      }
      // if any row has the level undefined, it gets the level of the previous row
      for (let i = 1; i < this.content.length; i += 1) {
        if (this.content[i].level === undefined) {
          this.content[i].level = this.content[i - 1].level;
        }
      }
      this.rows.next(this.content);
    }
  }

  toggleSection(row: SectionTitle): void {
    row.open = !row.open;
    this.openedSections[row.sectionId] = row.open;
    this.updateTableContent();
    if (row.open) {
      for (let c of this.content) {
        if (c.sectionId > row.sectionId) {
          break;
        }
        if (c.sectionId === row.sectionId) {
          c = this.updateRowValues(c);
        }
      }
    }
  }

  // Create new row if it s an indicator
  convertToRow = (item: Row | ProjectIndicator): Row => {
    if (this.isProjectIndicator(item)) {
      return this.indicatorToRow(item);
    }
    return item;
  }

  // Update all the table headers with the new dimensions
  updateDimensions(): void {
    if (this.dimensionIds.value === 'entity') {
      this.dimensions = JSON.parse(JSON.stringify(this.filter.value.entities));
      this.dimensions.push('_total');
    }
    else if (this.dimensionIds.value === 'group') {
      const entities = this.filter.value.entities;
      this.dimensions = this.project.groups.filter(group => {
        for (const e of group.members) {
          if (entities.includes(e.id)) {
            return true;
          }
        }
        return false;
      }).map(x => x.id);
      this.dimensions.push('_total');
    }
    else {
      let startTimeSlot = TimeSlot.fromDate(
        DatesHelper.dateToString(this.filter.value._start),
        TimeSlotPeriodicity[this.dimensionIds.value]
      );
      const endTimeSlot = TimeSlot.fromDate(
        DatesHelper.dateToString(this.filter.value._end),
        TimeSlotPeriodicity[this.dimensionIds.value]
      );

      this.dimensions = [];
      while (startTimeSlot !== endTimeSlot) {
        this.dimensions.push(startTimeSlot.value);
        startTimeSlot = startTimeSlot.next();
      }
      this.dimensions.push(endTimeSlot.value);
      this.dimensions.push('_total');
    }
    this.columnsToDisplay = this.COLUMNS_TO_DISPLAY.concat(this.dimensions);
    this.calculateOptimalColspan();
  }

  // Create row of the table from a ProjectIndicator
  indicatorToRow(indicator: ProjectIndicator, customFilter?: undefined): InfoRow {
    const row = {
      icon: true,
      name: indicator.display,
      baseline: indicator.baseline,
      colorize: indicator.colorize !== undefined ? indicator.colorize : false,
      target: indicator.target,
      unit: indicator.unit,
      sectionId: 0,
      values: {},
      onChart: false,
      dataset: {},
      filterFlag: true,
      computation: indicator.computation,
      originProject: indicator.originProject ? indicator.originProject : undefined,
      open: true
    } as InfoRow;

    if (customFilter) {
      row.customFilter = customFilter;
    }

    return row;
  }
  // Fetch the data of one especific row in function of project, content, filter and dimension
  // If this row has been loaded in the chart, the chart is updated as well
  updateRowValues(row: InfoRow): InfoRow {
    const currentFilter = this.filter.value;
    const start = new Date(currentFilter._start).toLocaleDateString().split('/');
    const end = new Date(currentFilter._end).toLocaleDateString().split('/');

    const formattedStart = start[2] + '-' +
                          (start[0].length === 1 ? + '0' + start[0] : start[0]) + '-' +
                          (start[1].length === 1 ? + '0' + start[1] : start[1]);

    const formattedEnd = end[2] + '-' +
                        (end[0].length === 1 ? + '0' + end[0] : end[0]) + '-' +
                        (end[1].length === 1 ? + '0' + end[1] : end[1]);

    const modifiedFilter = {
      _start: formattedStart,
      _end: formattedEnd,
      entity: currentFilter.entities
    };

    const currentProject = row.originProject ? row.originProject : this.project;
    const customFilter = JSON.parse(JSON.stringify(modifiedFilter));
    if (row.customFilter) {
      Object.assign(customFilter, row.customFilter);
    }


    if (this.checkPeriodicityIsValid(row)) {
      row.error = ['Loading'];
      this.reportingService.fetchData(currentProject, row.computation, [this.dimensionIds.value], customFilter, true, false).then(
        response => {
          if (response) {
            this.roundResponse(response);
            const data = this.formatResponseToDataset(response);
            row.dataset = {
              label: row.name,
              data,
              labels: Object.keys(response).filter(x => x !== '_total').map(x => this.getSiteOrGroupName(x)),
              fill: false,
              unit: row.computation.formula === PERCENTAGE_FORMULA ? '%' : ''
            };
            row.values = response;
            row.error = undefined;
            // TODO: Check why we have this row below
            this.rows.next(this.rows.value);

            if (row.onChart) {
              this.updateChart();
            }
          }
        }
      );
    }
    else if (row.onChart) {
      row.onChart = !row.onChart;
      this.updateChart();
    }

    return row;
  }

  // checks if the current row is compatible with the time periodicity chosen
  // normally, the row is compatible if: the row periodicity is smaller or equal to the global periodicity
  // the week-type periods are a special case
  checkPeriodicityIsValid(row: InfoRow): boolean {
    row.error = undefined;
    if (!row.computation || !row.computation.formula) {
      row.error = ['ReportingError.MissingCalculation'];
      return false;
    }

    let currentProject: Project = new Project();
    if (this.project) {
      currentProject = this.project;
    }
    if (row.originProject) {
      currentProject = row.originProject;
    }

    // the periodicity that represents the row is the biggest periodicity of all the datasources that
    // constitute the parameters to the computation
    let highestPeriodicity = 'day';

    for (const value of Object.values(row.computation.parameters)) {
      const varId = value['elementId'];
      currentProject.forms.forEach(form => {
        if (form.elements.find(element => element.id === varId)) {
          if (TimeSlotOrder[form.periodicity] > TimeSlotOrder[highestPeriodicity]) {
            highestPeriodicity = form.periodicity;
          }
        }
      });
    }

    // when the chosen periodicity and the row periodicity are both week-type,
    // they only work togheter if they are the same

    if (TimeSlotOrder[this.dimensionIds.value] < TimeSlotOrder[highestPeriodicity]) {
      row.error = ['ReportingError.DataNotAvailable', 'Filter.' + highestPeriodicity];
      return false;
    }
    return true;
  }

  // Fetch all data in function of project, content, filter, dimension and update table and chart
  refreshValues(): void {
    if (this.tableContent && this.filter && this.dimensionIds) {

      if (isArray(this.content)) {
        this.content.map(row => {
          if (this.isInfoRow(0, row)) {
            if (this.dimensions.length > 0) {
              if (this.openedSections[row.sectionId]) {
                row = this.updateRowValues(row);
              }
            }
            // this only happens when you group by collection sites or by group and you don't have any site or group in your project
            else {
              row.values = {};
              row.dataset = {};
              if (row.onChart) {
                this.updateChart();
              }
            }
          }
          // this only happens when you group by collection sites or by group and you don't have any site or group in your project
          else {
            row.values = {};
            row.dataset = {};
            if (row.onChart) {
              this.updateChart();
            }
          }
          return row;
        });
      }

    }
  }

  getSiteOrGroupName(id: string): string {
    if (this.project && (this.dimensionIds.value === 'entity' || this.dimensionIds.value === 'group')) {
      const site = this.project.entities.find(s => s.id === id);
      if (site !== undefined) {
        return site.name;
      }

      const group = this.project.groups.find(g => g.id === id);
      if (group !== undefined) {
        return group.name;
      }
    }
    if (id === '_total') { return 'Total'; }
    if (this.dimensionIds.value !== 'entity' && this.dimensionIds.value !== 'group') {
      const timeSlotAux = new TimeSlot(id);
      return timeSlotAux.humanizeValue(this.currentLang);
    }
    return id;
  }

  // this method builds the chart again everytime there is a click in the chart button
  updateChart(element?: InfoRow): void {

    // This element is set on the chart
    if (element && !element.error) {
      element.onChart = !element.onChart;
    }

    // Update of the chart type in function of the dimension that we have selected
    if (this.dimensionIds.value === 'entity' || this.dimensionIds.value === 'group') {
      this.chartService.changeType('bar');
    } else {
      this.chartService.changeType('line');
    }

    const datasets = [];

    // We take all the rows with the onChart attribute
    for (const row of this.dataSource.data) {
      if (row.onChart) {

        if (!row.dataset.backgroundColor) {
          row.dataset.borderColor = this.COLORS[this.currentColorIndex];
          row.dataset.backgroundColor = this.COLORS[this.currentColorIndex];

          this.currentColorIndex = (this.currentColorIndex + 1) % this.COLORS.length;
        }

        const copyOfDataset = Object.assign({}, row.dataset);

        datasets.push(copyOfDataset);
      }
    }
    const data = {
      labels: this.dimensions.filter(x => x !== '_total').map(x => this.getSiteOrGroupName(x)),
      datasets
    };
    this.chartService.addData(data);
  }

  // This allows to round all values
  roundResponse(response: unknown): unknown {
    for (const [key, value] of Object.entries(response)) {
      response[key] = value === null ? null : round(value as number);
    }
    return response;
  }

  formatResponseToDataset(response: unknown): { x: string, y: number }[] {
    const data = [];
    for (const dimension of this.dimensions.filter(x => x !== '_total')) {
      data.push({
        y: response[dimension],
        x: this.getSiteOrGroupName(dimension)
      });
    }

    return data;
  }

  // This method allows to receive the values of the disaggregated indicators inside of the indicator passed in parameter
  receiveIndicators(info: AddedIndicators): void {

    // Getting the indicator information inside the content
    let indicatorIndex = this.content.indexOf(info.indicator);
    const currentIndicator = this.content[indicatorIndex];
    const currentProject = currentIndicator.originProject ? currentIndicator.originProject : this.project;
    currentIndicator.nextRow = this.content[indicatorIndex + 1];

    if (info.splitBySites) {
      const newIndicators = [];
      const entities = info.indicator.originProject ? info.indicator.originProject.entities.map(x => x.id) : this.filter.value.entities;

      for (const entityId of entities) {
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

    else if (info.splitByTime) {
      let startTimeSlot = TimeSlot.fromDate(this.filter.value._start, TimeSlotPeriodicity[info.splitByTime]);
      let endTimeSlot = TimeSlot.fromDate(this.filter.value._end, TimeSlotPeriodicity[info.splitByTime]);
      endTimeSlot = endTimeSlot.next();

      const newIndicators = [];

      while (startTimeSlot !== endTimeSlot) {
        let customIndicator = JSON.parse(JSON.stringify(info.indicator)) as InfoRow;

        customIndicator.level = info.indicator.level + 1;
        // TO DO: add correct language here
        customIndicator.name = startTimeSlot.humanizeValue('en');
        customIndicator.values = {};

        if (!customIndicator.customFilter) {
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
      for (const disaggregatedIndicator of info.disaggregatedIndicators) {
        indicatorIndex += 1;

        let newRow;
        if (currentIndicator.customFilter) {
          newRow = this.indicatorToRow(disaggregatedIndicator, currentIndicator.customFilter);
        }
        else {
          newRow = this.indicatorToRow(disaggregatedIndicator);
        }
        newRow.sectionId = info.indicator.sectionId;
        newRow.level = info.indicator.level + 1;
        newRow = this.updateRowValues(newRow);

        this.content.splice(indicatorIndex, 0, newRow);
      }
      currentIndicator.open = !currentIndicator.open;
      this.updateTableContent();
    }
  }

  collapseIndicators(info: { indicator: InfoRow }): void {
    const indicatorIndex = this.content.indexOf(info.indicator);
    const currentIndicator = this.content[indicatorIndex];
    currentIndicator.open = !currentIndicator.open;

    for (let i = indicatorIndex + 1; i < this.content.length; i += 1) {
      if (this.content[i] === currentIndicator.nextRow) {
        break;
      }
      this.content.splice(i, 1);
      i -= 1;
    }

    this.updateTableContent();
    this.updateChart();
  }

  calcPaddingLevel(element: Row): string {
    if (element.level) {
      return `padding-left: ${element.level * 20}px;`;
    }
    return '';
  }

  calcColor(element: InfoRow, column: string): string {
    // the colors change in the following way:
    // we start in the red: rgb(255, 128, 128)
    // we go up increasing the value of the blue
    // until we reach the yellow: rgb (255, 128, 128)
    // after this we go down subtracting the value
    // of the red until we get to the green: rgb (128, 255, 128)

    if (this.checkIfNaN(element.values[column])) {
      return 'rgb(238, 238, 238)';
    }

    // Set background color to white if the row doesn't want colors
    if (!element.colorize
      || element.target === null
      || element.baseline === null) {
      return 'white';
    }

    const distance = element.target - element.baseline;

    let r = 255;
    let g = 128;
    const b = 128;

    // if the value is lower than the baseline, we choose red
    if (element.values[column] <= element.baseline) {
      r = 255;
      g = 128;
    }
    // if it is higher than the target, we choose green
    else if (element.values[column] >= element.target) {
      g = 255;
      r = 128;
    }
    // if it is somewhere in between, we calculate where and choose accordingly
    else {
      const myPosition = element.values[column] - element.baseline;
      const normalizedDifference = (myPosition / distance) * 255;
      if (normalizedDifference <= 127) {
        g += normalizedDifference;
      } else {
        g = 255;
        r -= (normalizedDifference - 127);
      }
    }

    if (distance < 0) {
      const aux = g;
      g = r;
      r = aux;
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

  checkIfNaN(x: unknown): boolean {
    return isNaN(x);
  }

  calculateOptimalColspan(): void {
    this.innerWidth = window.innerWidth;

    if (this.innerWidth < 640) {
      this.colsThatFitInTheScreen = 3;
    }
    else if (this.innerWidth < 1024) {
      this.colsThatFitInTheScreen = 3 + Math.floor((this.innerWidth - 640) / 85);
    }
    else {
      this.colsThatFitInTheScreen = 3 + Math.floor((this.innerWidth - 874) / 85);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
