// tslint:disable: variable-name
// tslint:disable:no-string-literal
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
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
import { Group } from 'src/app/models/classes/group.model';

type Row = (SectionTitle | GroupTitle | InfoRow) & RowCommentInfo;

type RowCommentInfo = {
  comment?: {
    value: string,
    cellValue?: string
  };
  comments?: { [key in string]: {
    value: string,
    cellValue?: string
  }};
  commentInfo?: Comment;
  disaggregatedBy?: { [key in string]: string };
};

@Component({
  selector: 'app-reporting-table',
  templateUrl: './reporting-table.component.html',
  styleUrls: ['./reporting-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
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
    private commentService: CommentService,
    private changeDetectorRef: ChangeDetectorRef
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
  @Input() showComments;
  @Input() userIsAdmin = false;
  @Output() userIsAdminChange = new EventEmitter<boolean>();
  rows = new BehaviorSubject<Row[]>([]);

  logFrameEntities = [];

  public menuLeft = 0;
  public menuTop = 0;

  public selectedCell: {
    row: any;
    col?: string;
  } | null = null;

  get globalCommentFilters(): Omit<CommentFilter, 'disaggregatedBy'> {
    const dimension = this.dimensionIds.getValue();

    return {
      dimension,
    };
  }

  /** @returns the comment for the selected cell */
  get selectedCellComment(): { value: string, cellValue?: string } | null {
    if (!this.selectedCell) { return null; }
    return (
      this.selectedCell.row.comment ||
      this.selectedCell.row.comments?.[this.selectedCell.col] ||
      null
    );
  }

  set selectedCellComment(comment: { value: string, cellValue?: string } | null) {
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
      if (!comment) {
        if (comments[this.selectedCell.col]) {
          delete comments[this.selectedCell.col];
        }
      } else {
        comments[this.selectedCell.col] = comment;
        this.selectedCell.row.comments = comments;
      }

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
      if (comment) {
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
      } else if (contentIndex !== -1) {
        delete commentInfo.content[contentIndex].comment;
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
    this.subscription.add(
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
      })
    );

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
        if (value.length > 0) {
          this.changeDetectorRef.detectChanges();
        }
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
                this.userIsAdminChange.emit(this.userIsAdmin);
                this.changeDetectorRef.detectChanges();
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
      let parentLevel: number | undefined;

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
            return el.customFilter.entity.some(entity =>
              this.currentFilter.entities.includes(entity)
            );
          }
          return true;
        })
      );
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
    const selectedLogFrames = this.getGroup(row);

    if (typeof selectedLogFrames !== 'undefined' && selectedLogFrames) {

      selectedLogFrames.entities.forEach(entity =>
        this.logFrameEntities.push(entity.id)
      );
      modifiedFilter = {
        _start:
          new Date(selectedLogFrames.start) < new Date(currentFilter._start) || selectedLogFrames.periodicity === 'free'
            ? new Date(currentFilter._start).toLocaleDateString('fr-CA')
            : new Date(selectedLogFrames.start).toLocaleDateString('fr-CA'),
        _end:
          new Date(selectedLogFrames.end) > new Date(currentFilter._end) || selectedLogFrames.periodicity === 'free'
            ? new Date(currentFilter._end).toLocaleDateString('fr-CA')
            : new Date(selectedLogFrames.end).toLocaleDateString('fr-CA'),
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

      // Filters the groups to only display groups that have to do with the indicator computation,
      // if no computation is present we show all the groups.
      const filteredGroupEntities = this.getRelevantGroups(groupEntities, currentIndicator, currentProject);

      for (const entityId of filteredGroupEntities) {
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

      // getting the logical frame of current indicator to get all its entities.
      // or current entity if the indicator is disaggregated by group
      const groupEntities = currentIndicator.customFilter?.entity ||
      (this.getGroup(currentIndicator)?.entities || []).map(({id}) => id).filter(Boolean);

      // Filters the groups to only display groups that have to do with the indicator computation,
      // if no computation is present we show all the groups.
      const filteredGroupEntities = this.getRelevantGroups(groupEntities, currentIndicator, currentProject);

      (currentProject.groups || []).map(projectGroup => {
        if (projectGroup.members.some(entity => filteredGroupEntities.includes(entity.id))) {
          groups.push(projectGroup);
        }
      });
      const parentEntities = (this.getGroup(currentIndicator).entities || []).map(({id}) => id).filter(Boolean);

      for (const group of groups) {
        const customFilter = {
          entity: group.members.map(x => x.id).filter(entity => parentEntities.includes(entity))
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
      const group = this.getGroup(currentIndicator);
      if (group) {
        const groupStartTimeSlot = TimeSlot.fromDate(
          group.start,
          TimeSlotPeriodicity[info.splitByTime]
        );
        const groupEndTimeSlot = TimeSlot.fromDate(
          group.end,
          TimeSlotPeriodicity[info.splitByTime]
        );
        if (startTimeSlot.firstDate < groupStartTimeSlot.firstDate) {
          startTimeSlot = groupStartTimeSlot;
        }
        if (endTimeSlot.firstDate > groupEndTimeSlot.firstDate) {
          endTimeSlot = groupEndTimeSlot;
        }
      }
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

  formatGroupName(groupName: string, getName = false) {
    if (getName) {
      return groupName.split(': ')[1] || '';
    }

    const group = groupName.split(':')[0];

    switch (group) {
      case this.translateService.instant('Activity'):
        if (this.activities.indexOf(groupName) === -1) {
          this.activities.push(groupName);
        }
        groupName =
          groupName.split(':')[0] +
          ' ' +
          (this.activities.indexOf(groupName) + 1) +
          ' : ' +
          groupName.split(':')[1];
        break;

      case this.translateService.instant('Result'):
        this.activities = [];
        if (this.results.indexOf(groupName) === -1) {
          this.results.push(groupName);
        }
        groupName =
          groupName.split(':')[0] +
          ' ' +
          (this.results.indexOf(groupName) + 1) +
          ' : ' +
          groupName.split(':')[1];
        break;

      case this.translateService.instant('SpecificObjective'):
        this.activities = [];
        this.results = [];
        if (this.specificObjectif.indexOf(groupName) === -1) {
          this.specificObjectif.push(groupName);
        }
        groupName =
          groupName.split(':')[0] +
          ' ' +
          (this.specificObjectif.indexOf(groupName) + 1) +
          ' : ' +
          groupName.split(':')[1];
        break;

      default:
        this.activities = [];
        this.specificObjectif = [];
        this.results = [];
        break;
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
    const group = this.getGroup(data);
    const currentDate = new Date(date);
    currentDate.setHours(12);

    let startDate: Date;
    let endDate: Date;

    if (group instanceof LogicalFrame) {
      startDate = group.start;
      endDate = group.end;
    }
    if (data.start && data.end) {
      startDate = data.start;
      endDate = data.end;
    }

    if (startDate && endDate) {

      if (['month', 'quarter', 'semester'].includes(TimeSlotPeriodicity[this.dimensionIds.value])) {
        startDate.setDate(1);
        endDate.setMonth(endDate.getMonth() + 1, 0);
      }

      if (['year'].includes(TimeSlotPeriodicity[this.dimensionIds.value])) {
        startDate.setMonth(0, 1);
        endDate.setMonth(11, 31);
      }

      if ( startDate > currentDate || endDate < currentDate ) {
        return false;
      }
    }
    return true;
  }

  styleValue(value, unit) {
    if (value === undefined) {
      return '';
    }

    if (value === 'Not a finite number' || value === 'division-by-zero') {
      return '!';
    }

    if (value === null || value === 'missing-data') {
      return '?';
    }

    if (value === 'AGGREGATION_FORBIDDEN') {
      return 'X';
    }

    let newValue = formatNumber(Number(value), 'de-DE', '1.0-1');

    if (unit) {
      newValue += unit;
    }

    return newValue;
  }

  getTooltipMessage(value) {

    if (value === 'AGGREGATION_FORBIDDEN') {
      return 'CannotBeComputedRule';
    }

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

  /**
   * Gets the baseline value from an element
   *
   * @param element The element to get the baseline from
   * @returns A string containing the baseline value
   */
  getIndicator(element: InfoRow, type: 'baseline' | 'target'): string {
    const value = element[type];
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

  /**
   * Update a comment based on the action selected.
   * 
   * @param action Action executed in a comment, can be:
   * - add - Creates a new comment, a modal will be open to write its content.
   * - edit - Edits an existing comment, a modal will be open to edit its content.
   * - delete - Deletes an existing comment.
   * @returns 
   */
  public updateCellComment(action: 'add' | 'edit' | 'delete'): void {
    if (!this.selectedCell) { return; }
    const { row } = this.selectedCell;
    const comment = this.selectedCellComment || { value: '' };

    console.log(this.getCellValueAsString());

    if (action === 'delete') {
      this.selectedCellComment = null;
      this.commentService.stashComment(row.commentInfo);
    } else {
      this.changeDetectorRef.detach();
      const dialogSubscription = this.dialog
        .open(CommentModalComponent, {
          data: {
            action,
            comment
          }
        })
        .afterClosed()
        .subscribe(result => {
          this.changeDetectorRef.reattach(); 
          if (result !== null) {
            this.selectedCellComment = { ...result, cellValue: this.getCellValueAsString() };
            this.commentService.stashComment(row.commentInfo);
          }
          dialogSubscription.unsubscribe();
        });
    }
  }

  private getRelevantGroups(groups: string[], indicator: any, project: any) {
    if (indicator.computation && Object.values(indicator.computation.parameters).length > 0) {
      const filteredGroups = [];

      for (const value of Object.values(indicator.computation.parameters)) {
        const varId = value['elementId'];
        project.forms.forEach(form => {
          if (form.elements.find(element => element.id === varId)) {
            groups.map(groupId => {
              if (form.entities.find(ent => ent.id === groupId) && filteredGroups.indexOf(groupId) === -1) {
                filteredGroups.push(groupId);
              }
            });
          }
        });
      }
      return filteredGroups;
    } else {
      return groups;
    }
  }

  /**
   * Gets the cell value for the selected cell.
   * 
   * @returns Formatted cell value as a string.
   */
  private getCellValueAsString(): string {
    const { row, col } = this.selectedCell;
    switch (col) {
      case 'target':
      case 'baseline':
        return this.getIndicator(row, col);
      case undefined:
        let result: string = row.title || row.groupName;
        return this.formatGroupName(result, true);
      case 'name':
        return row.name;
      default:
        return typeof row.values[col] === 'number' ? row.values[col].toString() : (row.values[col] || '');
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

