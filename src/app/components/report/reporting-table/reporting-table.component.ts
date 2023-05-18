// tslint:disable: variable-name
// tslint:disable:no-string-literal
import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import {
  PERCENTAGE_FORMULA,
  ProjectIndicator
} from 'src/app/models/classes/project-indicator.model';
import { Project } from 'src/app/models/classes/project.model';
import { ProjectService } from 'src/app/services/project.service';
import TimeSlot from 'timeslot-dag';
import {
  TimeSlotPeriodicity,
  TimeSlotOrder
} from 'src/app/utils/time-slot-periodicity';
import { cloneDeep, isArray, isNaN, round } from 'lodash';
import { ReportingService } from 'src/app/services/reporting.service';
import { ChartService } from 'src/app/services/chart.service';
import { AddedIndicators } from 'src/app/models/interfaces/report/added-indicators.model';
import { Filter } from 'src/app/components/report/filter/filter.component';
import DatesHelper from 'src/app/utils/dates-helper';
import { InfoRow } from 'src/app/models/interfaces/report/rows/info-row.model';
import { SectionTitle } from 'src/app/models/interfaces/report/rows/section-title.model';
import { GroupTitle } from 'src/app/models/interfaces/report/rows/group-title.model';
import { formatNumber, registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import localeDeExtra from '@angular/common/locales/extra/de';
import { LogicalFrame } from '../../../models/classes/logical-frame.model';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import {
  CommentFilter,
  CommentService,
  Comment,
  findContentIndexByFilter
} from 'src/app/services/comment.service';
import { CommentModalComponent } from '../comment-modal/comment-modal.component';
import { User } from 'src/app/models/classes/user.model';

type Row = (SectionTitle | GroupTitle | InfoRow) & RowCommentInfo;

type RowCommentInfo = {
  comment?: string;
  comments?: { [key in string]: string };
  commentInfo?: Comment;
  disaggregatedBy?: { [key in string]: string };
};

@Component({
  selector: 'app-reporting-table',
  templateUrl: './reporting-table.component.html',
  styleUrls: ['./reporting-table.component.scss']
})
export class ReportingTableComponent
  implements OnInit, OnDestroy, AfterViewInit {
  constructor(
    private projectService: ProjectService,
    private reportingService: ReportingService,
    private chartService: ChartService,
    private translateService: TranslateService,
    private dialog: MatDialog,
    private authService: AuthService,
    private commentService: CommentService
  ) {
    registerLocaleData(localeDe, 'de-DE', localeDeExtra);
  }

  get optimalColspanForGroupName(): number {
    return Math.min(
      this.columnsToDisplay.length - 2,
      this.colsThatFitInTheScreen
    );
  }

  get currentLang(): string {
    return this.translateService.currentLang
      ? this.translateService.currentLang
      : this.translateService.defaultLang;
  }

  @ViewChild('reportingTable') tableRef: ElementRef;
  @Input() tableContent: BehaviorSubject<any[]>;
  @Input() dimensionIds: BehaviorSubject<string>;
  @Input() filter: BehaviorSubject<Filter>;
  @Input() isCrossCuttingReport = false;
  @Input() showComments: boolean;
  rows = new BehaviorSubject<Row[]>([]);

  clickedLogFrame;
  logFrameEntities = [];

  public menuLeft = 0;
  public menuTop = 0;

  public userIsAdmin = false;
  public selectedCell: {
    row: any;
    col?: string;
  } | null = null;

  get globalCommentFilters(): Omit<CommentFilter, 'disaggregatedBy'> {
    const dateStart = this.filter.getValue()._start.toISOString();
    const dateEnd = this.filter.getValue()._end.toISOString();
    const dimension = this.dimensionIds.getValue();

    return {
      dateStart,
      dateEnd,
      dimension,
    };
  }

  /** @returns the comment for the selected cell */
  get selectedCellComment(): string | null {
    if (!this.selectedCell) { return null; }
    return (
      this.selectedCell.row.comment ||
      this.selectedCell.row.comments?.[this.selectedCell.col] ||
      null
    );
  }

  set selectedCellComment(comment: string) {
    if (!this.selectedCell) { return; }

    const isIndicator = !!this.selectedCell.col;
    const commentInfo: Comment = this.selectedCell.row.commentInfo;
    const filters = {
      ...this.globalCommentFilters,
      disaggregatedBy: this.selectedCell.row.disaggregatedBy || {}
    };
    const contentIndex = findContentIndexByFilter(commentInfo, filters);

    if (isIndicator) {
      // Update the comments
      const comments = this.selectedCell.row.comments || {};
      comments[this.selectedCell.col] = comment;
      this.selectedCell.row.comments = comments;

      // Update the commentInfo
      if (contentIndex !== -1) {
        commentInfo.content[contentIndex].comments = comments;
      } else {
        commentInfo.content.push({
          comments,
          filter: filters
        });
      }
    } else {
      // Update the comment
      this.selectedCell.row.comment = comment;

      // Update the commentInfo
      if (contentIndex !== -1) {
        commentInfo.content[contentIndex].comment = comment;
      } else {
        commentInfo.content.push({
          comment,
          filter: filters
        });
      }
    }
  }

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
    '#17becf'
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

  results: any[] = [];
  activities: any[] = [];
  specificObjectif: any[] = [];

  dimensions: string[];
  columnsToDisplay: string[];
  openedSections = { 0: true };
  COLUMNS_TO_DISPLAY = ['icon', 'name', 'baseline', 'target'];
  COLUMNS_TO_DISPLAY_ERROR = ['icon', 'name', 'baseline', 'target', 'error'];
  COLUMNS_TO_DISPLAY_TITLE = ['title', 'title_stick'];
  COLUMNS_TO_DISPLAY_GROUP = ['icon', 'groupName', 'group_stick'];

  //  @ViewChild('TABLE') table: ElementRef;

  @HostListener('window:resize', ['$event'])
  onResize(event): void {
    this.calculateOptimalColspan();
  }
  isSectionTitle = (_index: number, item: Row): item is SectionTitle =>
    (item as SectionTitle).title ? true : false
  isInfoRow = (_index: number, item: Row): item is InfoRow =>
    (item as InfoRow).name ? true : false
  isGroupTitle = (_index: number, item: Row): item is GroupTitle =>
    (item as GroupTitle).groupName ? true : false
  isProjectIndicator = (item: unknown): item is ProjectIndicator =>
    (item as ProjectIndicator).display ? true : false

  isInfoRowError = (_index: number, item: Row): boolean =>
    this.isInfoRow(_index, item) && item.error !== undefined
  isInfoRowNoError = (_index: number, item: Row): boolean =>
    this.isInfoRow(_index, item) && item.error === undefined

  get exportFilters(): any {
    const filter: any = this.filter.getValue();
    const filters: {
      logicalFrames: string[];
      dataSources: string[];
      crossCutting: boolean;
      extraIndicators: boolean;
      dateRange: {
        start: string;
        end: string;
      };
      entities: string[];
    } = {
      logicalFrames: [],
      dataSources: [],
      crossCutting: false,
      extraIndicators: false,
      dateRange: {
        start: filter._start._d
          ? filter._start._d.toLocaleDateString('fr-CA')
          : filter._start.toLocaleDateString('fr-CA'),
        end: filter._end._d
          ? filter._end._d.toLocaleDateString('fr-CA')
          : filter._end.toLocaleDateString('fr-CA')
      },
      entities: filter.entities || []
    };
    this.projectService.openedProject.subscribe((project: Project) => {
      let i = 1;
      project.logicalFrames.forEach(logicalFrame => {
        if (this.openedSections[i]) {
          filters.logicalFrames.push(logicalFrame.id);
        }
        i++;
      });
      if (this.openedSections[i]) {
        filters.crossCutting = true;
      }
      i++;
      if (this.openedSections[i]) {
        filters.extraIndicators = true;
      }
      i++;
      project.forms.forEach(dataSource => {
        if (this.openedSections[i]) {
          filters.dataSources.push(dataSource.id);
        }
        i++;
      });
    });

    return filters;
  }
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
                  return (
                    row.originProject.status === 'Ongoing' ||
                    row.originProject.status === 'Finished'
                  );
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
            const userSubscription = this.authService.currentUser.subscribe(
              (user: User) => {
                user.role === 'admin' || user.role === 'owner'
                  ? (this.userIsAdmin = true)
                  : (this.userIsAdmin = false);
              }
            );
            userSubscription.unsubscribe();
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
          });
          this.rows.next(updatedRows);
        }
      })
    );
  }

  ngAfterViewInit(): void {
    this.reportingService.currReportTable.next(this.tableRef);
  }

  updateTableContent(): void {
    this.reportingService.exportFilters.next(this.exportFilters);
    // TODO: Check why this.tableContent and not this.content
    if (
      this.tableContent &&
      this.filter &&
      this.dimensionIds &&
      isArray(this.content)
    ) {
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

      // Used for getIndicator()
      let parentLevel;

      // if any row has the level undefined, it gets the level of the previous row
      for (let i = 1; i < this.content.length; i += 1) {
        if (this.content[i].level === undefined) {
          this.content[i].level = this.content[i - 1].level;
        }

        // Info for getIndicator()
        if (this.content[i].groupName) {
          parentLevel = undefined;
        }
        if (
          this.content[i].name &&
          (this.content[i].unit !== '%' || this.content[i].unit !== '‰')
        ) {
          if (parentLevel === undefined) {
            parentLevel = this.content[i].level;
          }
          if (this.content[i].level === parentLevel) {
            this.content[i].isParent = parentLevel;
          }
        }
      }
      // Filters displayed rows with the entities selected in the collection sites filter
      // Disaggregations by collection sites and collection sites groups
      this.rows.next(
        this.content.filter(el => {
          if (el.customFilter && el.customFilter.entity) {
            return el.customFilter.entity.every(entity =>
              this.currentFilter.entities.includes(entity)
            );
          }
          return true;
        })
      );
    }
  }

  toggleSection(row: SectionTitle): void {
    this.clickedLogFrame = row;
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
  convertToRow = (
    item: (Row | ProjectIndicator) & RowCommentInfo
  ): Row & RowCommentInfo => {
    if (this.isProjectIndicator(item)) {
      return {
        ...this.indicatorToRow(item),
        commentInfo: item.commentInfo,
        disaggregatedBy: item.disaggregatedBy || {},
        comments: item.comments,
        comment: item.comment
      };
    }
    return item;
  }

  // Update all the table headers with the new dimensions
  updateDimensions(): void {
    if (this.dimensionIds.value === 'entity') {
      this.dimensions = JSON.parse(JSON.stringify(this.filter.value.entities));
      this.dimensions.push('_total');
    } else if (this.dimensionIds.value === 'group') {
      const entities = this.filter.value.entities;
      this.dimensions = this.project.groups
        .filter(group => {
          for (const e of group.members) {
            if (entities.includes(e.id)) {
              return true;
            }
          }
          return false;
        })
        .map(x => x.id);
      this.dimensions.push('_total');
    } else {
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
  indicatorToRow(indicator: ProjectIndicator, currentIndicator?: any): InfoRow {
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
      originProject: indicator.originProject
        ? indicator.originProject
        : undefined,
      open: true
    } as InfoRow;

    if (currentIndicator) {
      row.customFilter = currentIndicator.customFilter;
      row.start = currentIndicator.start;
      row.end = currentIndicator.end;
    }

    return row;
  }
  // Fetch the data of one especific row in function of project, content, filter and dimension
  // If this row has been loaded in the chart, the chart is updated as well
  updateRowValues(row: InfoRow): InfoRow {
    this.logFrameEntities = [];
    const currentFilter = this.filter.value;
    let modifiedFilter;

    const selectedLogFrames = this.project.logicalFrames.find(
      log =>
        log.name ===
        this.clickedLogFrame.title
          .substring(this.clickedLogFrame.title.indexOf(':') + 1)
          .trim()
    );

    if (typeof selectedLogFrames !== 'undefined' && selectedLogFrames) {
      selectedLogFrames.entities.forEach(entity =>
        this.logFrameEntities.push(entity.id)
      );
      modifiedFilter = {
        _start:
          new Date(selectedLogFrames.start) < new Date(currentFilter._start)
            ? new Date(currentFilter._start).toLocaleDateString('fr-CA')
            : new Date(selectedLogFrames.start).toLocaleDateString('fr-CA'),
        _end:
          new Date(selectedLogFrames.end) < new Date(currentFilter._start)
            ? new Date(selectedLogFrames.end).toLocaleDateString('fr-CA')
            : new Date(currentFilter._end).toLocaleDateString('fr-CA'),
        entity: currentFilter.entities.filter(e =>
          this.logFrameEntities.includes(e)
        )
      };
    } else {
      modifiedFilter = {
        _start: new Date(currentFilter._start).toLocaleDateString('fr-CA'),
        _end: new Date(currentFilter._end).toLocaleDateString('fr-CA'),
        entity: currentFilter.entities
      };
    }

    const currentProject = row.originProject ? row.originProject : this.project;
    const customFilter = JSON.parse(JSON.stringify(modifiedFilter));
    if (row.customFilter) {
      Object.assign(customFilter, row.customFilter);
    }

    if (this.checkPeriodicityIsValid(row)) {
      row.error = ['Loading'];
      this.reportingService
        .fetchData(
          currentProject,
          row.computation,
          [this.dimensionIds.value],
          customFilter,
          true,
          false
        )
        .then(response => {
          if (response) {
            // this.roundResponse(response);
            const data = this.formatResponseToDataset(response);
            row.dataset = {
              label: row.name,
              data,
              labels: Object.keys(response)
                .filter(x => x !== '_total')
                .map(x => this.getSiteOrGroupName(x)),
              fill: false,
              unit: row.computation.formula === PERCENTAGE_FORMULA ? '%' : ''
            };
            row.values = response;
            row.error = undefined;
            // TODO: Check why we have this row below?
            this.rows.next(this.rows.value);

            if (row.onChart) {
              this.updateChart();
            }
          }
        });
    } else if (row.onChart) {
      row.onChart = !row.onChart;
      this.updateChart();
    }

    // Update comment
    const commentInfo = row.commentInfo;

    const filters: CommentFilter = {
      ...this.globalCommentFilters,
      disaggregatedBy: row.disaggregatedBy || {}
    };

    // Check if there is a comment with the same filters
    const contentIndex = findContentIndexByFilter(commentInfo, filters);
    const content =
      contentIndex !== -1 ? commentInfo.content[contentIndex] : null;

    // If no match, remove old comments, if any
    if (!content) {
      delete row.comment;
      row.comments = {};
      return row;
    }

    // Check if the row corresponds to an indicator
    const path = row.commentInfo.path;
    const pathArr = path.split('|');
    const isIndicator = ['indicator:', 'element:'].some(prefix =>
      pathArr[pathArr.length - 1].startsWith(prefix)
    );

    if (isIndicator) { row.comments = content.comments; }
    else { row.comment = content.comment; }

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
          if (
            TimeSlotOrder[form.periodicity] > TimeSlotOrder[highestPeriodicity]
          ) {
            highestPeriodicity = form.periodicity;
          }
        }
      });
    }

    // when the chosen periodicity and the row periodicity are both week-type,
    // they only work togheter if they are the same

    if (
      TimeSlotOrder[this.dimensionIds.value] < TimeSlotOrder[highestPeriodicity]
    ) {
      row.error = [
        'ReportingError.DataNotAvailable',
        'Filter.' + highestPeriodicity
      ];
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
    if (
      this.project &&
      (this.dimensionIds.value === 'entity' ||
        this.dimensionIds.value === 'group')
    ) {
      const site = this.project.entities.find(s => s.id === id);
      if (site !== undefined) {
        return site.name;
      }

      const group = this.project.groups.find(g => g.id === id);
      if (group !== undefined) {
        return group.name;
      }
    }
    if (id === '_total') {
      return 'Total';
    }
    if (
      this.dimensionIds.value !== 'entity' &&
      this.dimensionIds.value !== 'group'
    ) {
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
    if (
      this.dimensionIds.value === 'entity' ||
      this.dimensionIds.value === 'group'
    ) {
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

          this.currentColorIndex =
            (this.currentColorIndex + 1) % this.COLORS.length;
        }

        const copyOfDataset = Object.assign({}, row.dataset);
        copyOfDataset.unit = row.unit;
        copyOfDataset.baseline = row.baseline;
        copyOfDataset.target = row.target;

        datasets.push(copyOfDataset);
      }
    }
    const data = {
      labels: this.dimensions
        .filter(x => x !== '_total')
        .map(x => this.getSiteOrGroupName(x)),
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

  formatResponseToDataset(response: unknown): { x: string; y: number }[] {
    const data = [];
    for (const dimension of this.dimensions.filter(x => x !== '_total')) {
      data.push({
        y: response[dimension],
        x: this.getSiteOrGroupName(dimension)
      });
    }

    return data;
  }

  // This method will return the input group for a given indicator
  getGroup(indicator: InfoRow): any {
    const { logicalFrames } = this.project;
    const { forms } = this.project;
    // We get the correct logical frame assuming that they will always be at the top
    return logicalFrames[indicator.sectionId - 1]
      ? logicalFrames[indicator.sectionId - 1]
      : forms[indicator.sectionId - logicalFrames.length - 3];
  }

  // This method allows to receive the values of the disaggregated indicators inside of the indicator passed in parameter
  receiveIndicators(info: AddedIndicators): void {
    // Getting the indicator information inside the content
    let indicatorIndex = this.content.indexOf(info.indicator);
    const currentIndicator = this.content[indicatorIndex];
    const currentProject = currentIndicator.originProject
      ? currentIndicator.originProject
      : this.project;
    currentIndicator.nextRow = this.content[indicatorIndex + 1];

    if (info.splitBySites) {
      const newIndicators = [];
      // const entities = info.indicator.originProject ? info.indicator.originProject.entities.map(x => x.id) : this.filter.value.entities;

      // getting the logical frame of current indicator to get all its entities.
      // or current entity if the indicator is disaggregated by group
      const group = this.getGroup(currentIndicator);
      const groupEntities = currentIndicator.customFilter?.entity || (group?.entities || []).map(({id}) => id).filter(Boolean);

      for (const entityId of groupEntities) {
        const customFilter = {
          entity: [entityId]
        };

        let customIndicator = Object.assign({}, info.indicator) as InfoRow;

        customIndicator.level = info.indicator.level + 1;
        customIndicator.onChart = false;
        customIndicator.name = currentProject.entities.find(
          x => x.id === entityId
        )?.name;
        customIndicator.customFilter = customFilter;
        customIndicator.values = {};
        customIndicator.start = currentProject.entities.find(
          x => x.id === entityId
        )?.start;
        customIndicator.end = currentProject.entities.find(
          x => x.id === entityId
        )?.end;

        // Remove group from disaggregatedBy
        const disaggregatedByWithoutGroup = cloneDeep(customIndicator.disaggregatedBy);
        delete disaggregatedByWithoutGroup.group;

        customIndicator.disaggregatedBy = Object.assign(
          disaggregatedByWithoutGroup,
          { entity: entityId }
        );
        customIndicator = this.updateRowValues(customIndicator);
        customIndicator.disaggregatedByGroup = 0;
        newIndicators.push(customIndicator);
      }

      this.content.splice(indicatorIndex + 1, 0, ...newIndicators);

      currentIndicator.open = !currentIndicator.open;
      this.updateTableContent();
    }

    else if (info.splitBySiteGroups) {
      const newIndicators = [];
      const groups = [];

      (currentProject.groups || []).map(projectGroup => {
        if (projectGroup.members.every(entity => this.getGroup(currentIndicator).entities.includes(entity))) {
          groups.push(projectGroup);
        }
      });

      for (const group of groups) {
        const customFilter = {
          entity: group.members.map(x => x.id)
        };

        let customIndicator = Object.assign({}, info.indicator) as InfoRow;

        customIndicator.level = info.indicator.level + 1;
        customIndicator.onChart = false;
        customIndicator.name = group.name;
        customIndicator.customFilter = customFilter;
        customIndicator.values = {};
        customIndicator.disaggregatedBy = Object.assign(
          cloneDeep(customIndicator.disaggregatedBy),
          { group: group.id }
        );
        customIndicator = this.updateRowValues(customIndicator);
        customIndicator.disaggregatedByGroup = 1;
        newIndicators.push(customIndicator);
      }

      this.content.splice(indicatorIndex + 1, 0, ...newIndicators);

      currentIndicator.open = !currentIndicator.open;
      this.updateTableContent();
    }

    else if (info.splitByTime) {
      let startTimeSlot = TimeSlot.fromDate(
        this.filter.value._start,
        TimeSlotPeriodicity[info.splitByTime]
      );
      let endTimeSlot = TimeSlot.fromDate(
        this.filter.value._end,
        TimeSlotPeriodicity[info.splitByTime]
      );
      endTimeSlot = endTimeSlot.next();

      const newIndicators = [];
      let counter = 0;
      while (startTimeSlot !== endTimeSlot) {
        counter++;

        let customIndicator = JSON.parse(
          JSON.stringify(info.indicator)
        ) as InfoRow;
        customIndicator.level = info.indicator.level + 1;

        const dateToCompare =
          new Date(this.filter.value._start)
            .toLocaleDateString('fr-CA')
            .split('-')[0] +
          '-' +
          new Date(this.filter.value._start)
            .toLocaleDateString('fr-CA')
            .split('-')[1];

        if (counter === 1) {
          if (dateToCompare === startTimeSlot.value) {
            customIndicator.name = startTimeSlot.humanizeValue(
              this.translateService.currentLang
            );
          }
        } else {
          customIndicator.name = startTimeSlot.humanizeValue(
            this.translateService.currentLang
          );
        }
        customIndicator.values = {};

        if (!customIndicator.customFilter) {
          customIndicator.customFilter = {};
        }
        customIndicator.customFilter[info.splitByTime] = [startTimeSlot.value];

        customIndicator.disaggregatedBy = Object.assign(
          cloneDeep(customIndicator.disaggregatedBy),
          { [info.splitByTime]: [startTimeSlot.value] }
        );

        customIndicator = this.updateRowValues(customIndicator);
        if (customIndicator.name !== info.indicator.name) {
          newIndicators.push(customIndicator);
        }

        startTimeSlot = startTimeSlot.next();
      }
      this.content.splice(indicatorIndex + 1, 0, ...newIndicators);

      currentIndicator.open = !currentIndicator.open;
      this.updateTableContent();
    } else {
      for (const disaggregatedIndicator of info.disaggregatedIndicators) {
        indicatorIndex += 1;

        let newRow;
        if (currentIndicator.customFilter) {
          newRow = this.indicatorToRow(
            disaggregatedIndicator,
            currentIndicator
          );
        } else {
          newRow = this.indicatorToRow(disaggregatedIndicator);
        }

        if (currentIndicator.disaggregatedByGroup > 0) {
          newRow.disaggregatedByGroup = currentIndicator.disaggregatedByGroup + 1;
        }
        newRow.sectionId = info.indicator.sectionId;
        newRow.level = info.indicator.level + 1;
        newRow.commentInfo = info.indicator.commentInfo;

        newRow.disaggregatedBy = Object.assign(
          cloneDeep(info.indicator.disaggregatedBy),
          disaggregatedIndicator.partitionedBy || {}
        );

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
    // until we reach the yellow: rgb (255, 255, 128)
    // after this we go down subtracting the value
    // of the red until we get to the green: rgb (128, 255, 128)

    if (this.checkIfNaN(element.values[column])) {
      return 'rgb(238, 238, 238)';
    }

    if (
      element.values[column] === null ||
      isNaN(Number(element.values[column]))
    ) {
      return 'white';
    }

    // Set background color to white if the row doesn't want colors
    if (
      !element.colorize ||
      element.target === null ||
      element.baseline === null
    ) {
      return 'white';
    }

    let r = 255;
    let g = 128;
    const b = 128;

    if (element.baseline <= element.target) {
      const distance = element.target - element.baseline;

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
          r -= normalizedDifference - 127;
        }
      }
    } else {
      // If baseline is a higher value that the target we invert the calculations
      const distance = element.baseline - element.target;

      // if the value is higher than the baseline, we choose red
      if (element.values[column] >= element.baseline) {
        r = 255;
        g = 128;
      }
      // if it is lower than the target, we choose green
      else if (element.values[column] <= element.target) {
        g = 255;
        r = 128;
      }
      // if it is somewhere in between, we calculate where and choose accordingly
      else {
        const myPosition = element.baseline - element.values[column];
        const normalizedDifference = (myPosition / distance) * 255;
        if (normalizedDifference <= 127) {
          g += normalizedDifference;
        } else {
          g = 255;
          r -= normalizedDifference - 127;
        }
      }
    }

    return `rgb(${r}, ${g}, ${b})`;
  }

  randomNumberLimit(limit: number): number {
    return Math.floor(Math.random() * limit + 1);
  }

  randomColor(): string {
    const col =
      'rgba(' +
      this.randomNumberLimit(255) +
      ',' +
      this.randomNumberLimit(255) +
      ',' +
      this.randomNumberLimit(255) +
      ', 1)';
    return col;
  }

  checkIfNaN(x: unknown): boolean {
    return isNaN(x);
  }

  calculateOptimalColspan(): void {
    this.innerWidth = window.innerWidth;

    if (this.innerWidth < 640) {
      this.colsThatFitInTheScreen = 3;
    } else if (this.innerWidth < 1024) {
      this.colsThatFitInTheScreen =
        3 + Math.floor((this.innerWidth - 640) / 85);
    } else {
      this.colsThatFitInTheScreen =
        3 + Math.floor((this.innerWidth - 874) / 85);
    }
  }

  formatGroupName(groupName: string) {
    if (groupName.charAt(0) === 'A') {
      if (this.activities.indexOf(groupName) === -1) {
        this.activities.push(groupName);
      }
      return (
        groupName.split(':')[0] +
        ' ' +
        (this.activities.indexOf(groupName) + 1) +
        ' : ' +
        groupName.split(':')[1]
      );
    } else if (groupName.charAt(0) === 'R') {
      this.activities = [];
      if (this.results.indexOf(groupName) === -1) {
        this.results.push(groupName);
      }
      return (
        groupName.split(':')[0] +
        ' ' +
        (this.results.indexOf(groupName) + 1) +
        ' : ' +
        groupName.split(':')[1]
      );
    } else if (
      groupName.charAt(0) === 'O' &&
      groupName.split(' ')[1].charAt(0) === 'S'
    ) {
      this.activities = [];
      this.results = [];
      if (this.specificObjectif.indexOf(groupName) === -1) {
        this.specificObjectif.push(groupName);
      }
      return (
        groupName.split(':')[0] +
        ' ' +
        (this.specificObjectif.indexOf(groupName) + 1) +
        ' : ' +
        groupName.split(':')[1]
      );
    } else {
      this.activities = [];
      this.specificObjectif = [];
      this.results = [];
    }
    return groupName;
  }

  isItalic(value): boolean {
    if (typeof value === 'string' && !isNaN(Number(value))) {
      return true;
    }
    return false;
  }

  isInRange(data, date): boolean {
    let result = true;
    const group = this.getGroup(data);
    const currentDate = new Date(date);
    currentDate.setHours(12);

    if (group instanceof LogicalFrame) {
      if (
        group.start.getTime() > currentDate.getTime() ||
        group.end.getTime() < currentDate.getTime()
      ) {
        result = false;
      }
    }
    if (data.start && data.end) {
      if (
        data.start.getTime() > currentDate.getTime() ||
        data.end.getTime() < currentDate.getTime()
      ) {
        result = false;
      }
    }
    return result;
  }

  styleValue(value, unit) {
    if (value === undefined) {
      return '';
    }

    if (value === 'Not a finite number') {
      return '!';
    }

    if (value === null || isNaN(Number(value))) {
      return '?';
    }

    let newValue = formatNumber(Number(value), 'de-DE', '1.0-1');

    if (unit) {
      newValue += unit;
    }

    return newValue;
  }

  getTooltipMessage(value) {
    if (value === undefined) {
      return '';
    }

    if (value === 'Not a finite number') {
      return 'DivisionByZero';
    }

    if (value === null || isNaN(Number(value))) {
      return 'CannotBeComputed';
    }

    if (typeof value === 'string' && !isNaN(Number(value))) {
      return 'IncompleteData';
    }

    return '';
  }

  /* TEMPORARY
  exportTOExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'SheetJS.xlsx');
  } */

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  /**
   * Gets the baseline value from an element
   *
   * @param element The element to get the baseline from
   * @returns A string containing the baseline value
   */
  getIndicator(element: InfoRow, type: 'baseline' | 'target'): string {
    const value = element[type];
    // if (type === 'baseline') console.log(element);
    if (
      value === null ||
      value === undefined ||
      (element.isParent !== element.level &&
        element.unit !== '%' &&
        element.unit !== '‰')
    ) {
      return '';
    }
    return value + (element.unit ?? '');
  }

  onRightClick(
    event: MouseEvent,
    trigger: MatMenuTrigger,
    triggerElement: HTMLElement,
    el?: any,
    col?: string
  ): void {
    this.selectedCell = { row: el, col };
    if (this.userIsAdmin) {
      triggerElement.style.left = event.clientX + 5 + 'px';
      triggerElement.style.top = event.clientY + 5 + 'px';
      if (trigger.menuOpen) {
        trigger.closeMenu();
        trigger.openMenu();
      } else {
        trigger.openMenu();
      }
      event.preventDefault();
    }
  }

  public updateCellComment(action: 'add' | 'edit' | 'delete'): void {
    if (!this.selectedCell) { return; }
    const { row } = this.selectedCell;
    const comment = this.selectedCellComment || '';

    if (action === 'delete') {
      this.selectedCellComment = '';
      this.commentService.stashComment(row.commentInfo);
    } else {
      this.dialog
        .open(CommentModalComponent, {
          data: {
            action,
            comment
          }
        })
        .afterClosed()
        .subscribe(result => {
          if (result === null) { return; }
          this.selectedCellComment = result || '';
          this.commentService.stashComment(row.commentInfo);
        });
    }
  }

  public getTooltipText(originalTooltip?: string, comment?: string): any {
    let tooltipContent = '';

    if (this.showComments) {
      if (originalTooltip) {
        tooltipContent += `
          <div style='opacity: .75; font-style: italic;'>
            ${originalTooltip}
          </div>`;
      }
      if (comment) {
        tooltipContent += `<div>${comment}<div>`;
      }
    } else {
      if (originalTooltip) {
        tooltipContent += `<div>${originalTooltip}</div>`;
      }
    }

    return tooltipContent !== '' ? tooltipContent : null;

    // if ((!comment && !originalTooltip)||(!originalTooltip && !this.showComments)) {
    //   return null;
    // }
    // if (!comment || !this.showComments) {
    //   if (this.showComments) {
    //     return `
    //       <div style='opacity: .75; font-style: italic;'>
    //         ${originalTooltip}
    //       </div>
    //     `;
    //   } else {
    //     return `<div>${originalTooltip}</div>`;
    //   }
    // } else if (!originalTooltip) {
    //   return `<div>${comment}</div>`;
    // } else {
    //   return `
    //     <div style='opacity: .75; font-style: italic;'>
    //       ${originalTooltip}
    //     </div>
    //     <div>${comment}<div>
    //   `;
    // }
  }
}
