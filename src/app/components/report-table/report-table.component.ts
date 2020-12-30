import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from 'src/app/models/project.model';
import { MatTableDataSource } from '@angular/material/table';
import { animate, state, style, transition, trigger } from '@angular/animations';
import TimeSlot from 'timeslot-dag';
import { TimeSlotPeriodicity } from 'src/app/utils/time-slot-periodicity';
import { ReportingService } from 'src/app/services/reporting.service';
import { round } from 'lodash';
import { ChartService } from 'src/app/services/chart.service';

const COLUMNS_TO_DISPLAY =  ['icon', 'name', 'baseline', 'target'];


@Component({
  selector: 'app-report-table',
  templateUrl: './report-table.component.html',
  styleUrls: ['./report-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class ReportTableComponent implements OnInit, OnDestroy {
  dataSource = new MatTableDataSource([]);

  columnsToDisplay = COLUMNS_TO_DISPLAY;
  COLUMNS_TO_DISPLAY_GROUP = ['icon', 'groupName'];

  expandedElement: InfoRow | null;

  dimensions: string[] = [];
  @Input() dimensionIds: BehaviorSubject<string>;
  @Input() filter: BehaviorSubject<any>;

  private subscription: Subscription = new Subscription();
  project: Project;

  isSectionTitle = (index, item: any): item is SectionTitle => (item as SectionTitle).title ? true : false;
  isInfoRow = (index, item: any): item is InfoRow => (item as InfoRow).name ? true : false;
  isGroupTitle = (index, item: any): item is GroupTitle => (item as GroupTitle).groupName ? true : false;

  constructor(private projectService: ProjectService,
              private reportingService: ReportingService,
              private chartService: ChartService) { }

  ngOnInit(): void {
    this.subscription.add(
      this.projectService.openedProject.subscribe( (project: Project) => {
        this.project = project;
        this.buildTableRows();
      })
    );

    this.subscription.add(
      this.dimensionIds.subscribe(value => {
        this.fillDimensions();
      })
    );

    this.subscription.add(
      this.filter.subscribe(value => {
        this.fillDimensions();
      })
    );
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

    this.columnsToDisplay = COLUMNS_TO_DISPLAY.concat(this.dimensions);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  buildTableRows(){
    if (!this.project){
      return;
    }

    const newData = [];
    let id = 0;
    for (const logicalFrame of this.project.logicalFrames){
      newData.push({
        title: `Logical framework: ${logicalFrame.name}`,
        sectionId: id,
        open: false,
        click: async (myId: number) => await this.sectionToggle(myId, this.openLogicalFrameworks),
        logicalFrameId: logicalFrame.id
      });
      id += 1;
    }

    newData.push({
      title: 'Cross-cutting Indicators',
      sectionId: id,
      open: false,
      click: async (myId: number) => await this.sectionToggle(myId, this.openCrossCuttingIndicators),
    });
    id += 1;

    newData.push({
      title: 'Extra indicators',
      sectionId: id,
      open: false,
      click: async (myId: number) => await this.sectionToggle(myId, this.openExtraIndicators),
    });
    id += 1;


    for (const form of this.project.forms){
      newData.push(
        {
          title: `Data source: ${form.name}`,
          sectionId: id,
          open: false,
          click: async (myId: number) => await this.sectionToggle(myId, this.openDataSource),
          formId: form.id
        }
      );
      id += 1;
    }

    this.dataSource = new MatTableDataSource(newData);
  }


  // this replace the current MataTableDataSource with a new one, adding or removing rows as needed
  async sectionToggle(sectionId: number, openSection: (row: any, sectionId: any) => Promise<any[]> ) {
    let newData = [];
    let foundSection = false;
    let open = true;

    for (let row of this.dataSource.data){
      // if the row is unrelated to the click, we just copy it
      if (!foundSection || open || (row as SectionTitle).sectionId !== sectionId){
        newData.push(row);
      }

      row = row as SectionTitle;
      // found the first row with that specific sectionId
      if ( !foundSection && row.sectionId === sectionId){
        foundSection = true;
        row.open = !row.open;
        open = row.open;

        // if it is open we add data to the table
        if (row.open){
          const newRows = await openSection(row, sectionId);
          newData = newData.concat(newRows);
        }
      }
    }
    this.dataSource = new MatTableDataSource(newData);
  }

  openLogicalFrameworks = async (row, sectionId) => {
    const lf = this.project.logicalFrames.find(x => x.id === row.logicalFrameId);

    const currentFilter = this.filter.value;
    const modifiedFilter = {
      _start: currentFilter._start.toISOString().slice(0, 10),
      _end: currentFilter._end.toISOString().slice(0, 10),
      entity: currentFilter.entity
    };

    const logicalRows = [];
    logicalRows.push({
      icon: false,
      groupName: `General objective: ${lf.goal}`,
      sectionId
    } as GroupTitle );

    for (const indicator of lf.indicators){
      const response = await this.reportingService.fetchData(
        this.project, indicator.computation, [this.dimensionIds.value] , modifiedFilter, true, false
        );
      this.roundResponse(response);

      const data = [];
      for (const [key, value] of Object.entries(response)) {
        if (key !== '_total'){
          data.push({
            y: value,
            x: key
          });
        }
      }

      logicalRows.push({
        icon: true,
        name: indicator.display,
        baseline: indicator.baseline,
        target: indicator.target,
        sectionId,
        values: response,
        onChart: false,
        dataset: {
          label: indicator.display,
          data,
          labels: Object.keys(response).map(x => this.getSiteOrGroupName(x)),
          borderColor: this.randomColor(),
          backgroundColor: this.randomColor(),
          fill: false
        }
      } as InfoRow);
    }


    for (const purpose of lf.purposes){
      logicalRows.push({
        icon: false,
        groupName: `Specific objective: ${purpose.description}`,
        sectionId
      } as GroupTitle);

      for (const indicator of purpose.indicators){
        const response = await this.reportingService.fetchData(
          this.project, indicator.computation, [this.dimensionIds.value] , modifiedFilter, true, false
          );
        this.roundResponse(response);

        const data = [];
        for (const [key, value] of Object.entries(response)) {
          if (key !== '_total'){
            data.push({
              y: value,
              x: key
            });
          }
        }

        logicalRows.push({
          icon: true,
          name: indicator.display,
          baseline: indicator.baseline,
          target: indicator.target,
          sectionId,
          values: response,
          onChart: false,
          dataset: {
            label: indicator.display,
            data,
            labels: Object.keys(response).map(x => this.getSiteOrGroupName(x)),
            borderColor: this.randomColor(),
            backgroundColor: this.randomColor(),
            fill: false
          }
        } as InfoRow);
      }

      for (const output of purpose.outputs){
        logicalRows.push({
          icon: false,
          groupName: `Result: ${output.description}`,
          sectionId
        } as GroupTitle);

        for (const indicator of output.indicators){
          const response = await this.reportingService.fetchData(
            this.project, indicator.computation, [this.dimensionIds.value] , modifiedFilter, true, false
            );
          this.roundResponse(response);

          const data = [];
          for (const [key, value] of Object.entries(response)) {
            if (key !== '_total'){
              data.push({
                y: value,
                x: key
              });
            }
          }

          logicalRows.push({
            icon: true,
            name: indicator.display,
            baseline: indicator.baseline,
            target: indicator.target,
            sectionId,
            values: response,
            onChart: false,
            dataset: {
              label: indicator.display,
              data,
              labels: Object.keys(response).map(x => this.getSiteOrGroupName(x)),
              borderColor: this.randomColor(),
              backgroundColor: this.randomColor(),
              fill: false
            }
          } as InfoRow);
        }

        for (const activity of output.activities){
          logicalRows.push({
            icon: false,
            groupName: `Activity: ${activity.description}`,
            sectionId
          } as GroupTitle);

          for (const indicator of activity.indicators){
            const response = await this.reportingService.fetchData(
              this.project, indicator.computation, [this.dimensionIds.value] , modifiedFilter, true, false
              );
            this.roundResponse(response);

            const data = [];
            for (const [key, value] of Object.entries(response)) {
              if (key !== '_total'){
                data.push({
                  y: value,
                  x: key
                });
              }
            }

            logicalRows.push({
              icon: true,
              name: indicator.display,
              baseline: indicator.baseline,
              target: indicator.target,
              sectionId,
              values: response,
              onChart: false,
              dataset: {
                label: indicator.display,
                data,
                labels: Object.keys(response).map(x => this.getSiteOrGroupName(x)),
                borderColor: this.randomColor(),
                backgroundColor: this.randomColor(),
                fill: false
              }
            } as InfoRow);
          }
        }
      }
    }
    return logicalRows;
  }

  openCrossCuttingIndicators = async (row, sectionId) => {
    const currentFilter = this.filter.value;
    const modifiedFilter = {
      _start: currentFilter._start.toISOString().slice(0, 10),
      _end: currentFilter._end.toISOString().slice(0, 10),
      entity: currentFilter.entity
    };

    const CcIndicatorsRows = [];
    for (const indicator of this.project.crossCutting){
      const response = await this.reportingService.fetchData(
        this.project, indicator.computation, [this.dimensionIds.value] , modifiedFilter, true, false
        );
      this.roundResponse(response);

      const data = [];
      for (const [key, value] of Object.entries(response)) {
        if (key !== '_total'){
          data.push({
            y: value,
            x: key
          });
        }
      }

      CcIndicatorsRows.push({
        icon: true,
        name: indicator.display,
        baseline: indicator.baseline,
        target: indicator.target,
        sectionId,
        values: response,
        onChart: false,
        dataset: {
          label: indicator.display,
          data,
          labels: Object.keys(response).map(x => this.getSiteOrGroupName(x)),
          borderColor: this.randomColor(),
          backgroundColor: this.randomColor(),
          fill: false
        }
      } as InfoRow);
    }

    return CcIndicatorsRows;
  }

  openExtraIndicators = async (row, sectionId) => {
    const currentFilter = this.filter.value;
    const modifiedFilter = {
      _start: currentFilter._start.toISOString().slice(0, 10),
      _end: currentFilter._end.toISOString().slice(0, 10),
      entity: currentFilter.entity
    };

    const extraIndicatorsRows = [];
    for (const indicator of this.project.extraIndicators){
      const response = await this.reportingService.fetchData(
        this.project, indicator.computation, [this.dimensionIds.value] , modifiedFilter, true, false
        );
      this.roundResponse(response);

      const data = [];
      for (const [key, value] of Object.entries(response)) {
        if (key !== '_total'){
          data.push({
            y: value,
            x: key
          });
        }
      }

      extraIndicatorsRows.push({
        icon: true,
        name: indicator.display,
        baseline: indicator.baseline,
        target: indicator.target,
        sectionId,
        values: response,
        onChart: false,
        dataset: {
          label: indicator.display,
          data,
          labels: Object.keys(response).map(x => this.getSiteOrGroupName(x)),
          borderColor: this.randomColor(),
          backgroundColor: this.randomColor(),
          fill: false
        }
      } as InfoRow);
    }

    return extraIndicatorsRows;
  }

  openDataSource = async (row, sectionId) => {
    const form = this.project.forms.find( (myform) => myform.id === row.formId);

    const dataSourceRows = [];
    for (const element of form.elements){
      const currentFilter = this.filter.value;
      const modifiedFilter = {
        _start: currentFilter._start.toISOString().slice(0, 10),
        _end: currentFilter._end.toISOString().slice(0, 10),
        entity: currentFilter.entity
      };

      const computation =  {
        formula: 'a',
        parameters: {
          a: {
            elementId: element.id,
            filter: {}
          }
        }
      };

      const response = await this.reportingService.fetchData(
        this.project, computation, [this.dimensionIds.value] , modifiedFilter, true, false
        );
      this.roundResponse(response);

      const data = [];
      for (const [key, value] of Object.entries(response)) {
        if (key !== '_total'){
          data.push({
            y: value,
            x: key
          });
        }
      }

      dataSourceRows.push( {
        icon: true,
        name: element.name,
        baseline: null,
        target: null,
        sectionId,
        values: response,
        onChart: false,
        dataset: {
          label: element.name,
          data,
          labels: Object.keys(response).map(x => this.getSiteOrGroupName(x)),
          borderColor: this.randomColor(),
          backgroundColor: this.randomColor(),
          fill: false
        }
      } as InfoRow );
    }
    return dataSourceRows;
  }

  roundResponse(response){
    for (const [key, value] of Object.entries(response)) {
      response[key] = round(value as number);
    }
    return response;
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

  randomNumberLimit(limit) {
    return Math.floor((Math.random() * limit) + 1);
  }
  randomColor() {
    const col = 'rgba(' + this.randomNumberLimit(255)
      + ',' + this.randomNumberLimit(255)
      + ',' + this.randomNumberLimit(255) + ', 1)';
    return col;
  }

}

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
}

type Row = SectionTitle | GroupTitle | InfoRow;

