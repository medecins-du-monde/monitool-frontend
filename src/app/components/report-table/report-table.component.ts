import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from 'src/app/models/project.model';
import { MatTableDataSource } from '@angular/material/table';
import { animate, state, style, transition, trigger } from '@angular/animations';
import TimeSlot from 'timeslot-dag';
import { TimeSlotPeriodicity } from 'src/app/utils/time-slot-periodicity';
import { ReportingService } from 'src/app/services/reporting.service';

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
              private reportingService: ReportingService) { }

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
    )
  }

  fillDimensions() {

    if (this.dimensionIds.value === 'entity'){
      this.dimensions = this.project.entities.map(x => x.name);
    }
    else if (this.dimensionIds.value === 'group'){
      this.dimensions = this.project.groups.map(x => x.name)
    }
    else {
      let startTimeSlot = TimeSlot.fromDate(this.filter.value._start, TimeSlotPeriodicity[this.dimensionIds.value]);
      let endTimeSlot = TimeSlot.fromDate(this.filter.value._end, TimeSlotPeriodicity[this.dimensionIds.value]);    
  
      this.dimensions = [];
      while(startTimeSlot !== endTimeSlot){
        this.dimensions.push(startTimeSlot.value);
        startTimeSlot = startTimeSlot.next()
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
        click: (myId: number) => this.sectionToggle(myId, this.openLogicalFrameworks),
        logicalFrameId: logicalFrame.id
      });
      id += 1;
    }

    newData.push({
      title: 'Cross-cutting Indicators',
      sectionId: id,
      open: false
    });
    id += 1;

    newData.push({
      title: 'Extra indicators',
      sectionId: id,
      open: false
    });
    id += 1;


    for (const form of this.project.forms){
      newData.push(
        {
          title: `Data source: ${form.name}`,
          sectionId: id,
          open: false,
          click: (myId: number) => this.sectionToggle(myId, this.openDataSource),
          formId: form.id
        }
      );
      id += 1;
    }

    this.dataSource = new MatTableDataSource(newData);
  }

  // this replace the current MataTableDataSource with a new one, adding or removing rows as needed
  toggleData(sectionId: number){
    const newData = [];
    let foundSection = false;
    let open = true;

    for (const row of this.dataSource.data){
      if (!foundSection || open || (row as SectionTitle).sectionId !== sectionId){
        newData.push(row);
      }

      if ( !foundSection && (row as SectionTitle).sectionId === sectionId){
        foundSection = true;
        (row as SectionTitle).open = !(row as SectionTitle).open;
        open = (row as SectionTitle).open;
        // if it is open we add data to the table
        if ((row as SectionTitle).open){
          newData.push({
            icon: false,
            groupName: 'productivity at work (en)',
            sectionId
          });

          newData.push({
            icon: true,
            name: 'number of lines written',
            baseline: 50,
            target: 100,
            sectionId
          });
          newData.push({
            icon: true,
            name: 'number of lines written',
            baseline: 50,
            target: 100,
            sectionId
          });
        }
      }
    }
    this.dataSource = new MatTableDataSource(newData);
  }

  // this replace the current MataTableDataSource with a new one, adding or removing rows as needed
  async sectionToggle(sectionId: number, openSection ) {
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
    console.log(lf);

    const currentFilter = this.filter.value;
    let modifiedFilter = {
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
      const response = await this.reportingService.fetchData(this.project, indicator.computation, [this.dimensionIds.value] , modifiedFilter, true, false);
      
      logicalRows.push({
        icon: true,
        name: indicator.display,
        baseline: indicator.baseline,
        target: indicator.target,
        sectionId,
        values: response
      } as InfoRow);
    }


    for (const purpose of lf.purposes){
      logicalRows.push({
        icon: false,
        groupName: `Specific objective: ${purpose.description}`,
        sectionId
      } as GroupTitle);

      for (const indicator of purpose.indicators){
        const response = await this.reportingService.fetchData(this.project, indicator.computation, [this.dimensionIds.value] , modifiedFilter, true, false);
        
        logicalRows.push({
          icon: true,
          name: indicator.display,
          baseline: indicator.baseline,
          target: indicator.target,
          sectionId,
          values: response
        } as InfoRow);
      }


    }
    return logicalRows;
  };

  openDataSource = async (row, sectionId) => {
    const form = this.project.forms.find( (myform) => myform.id === row.formId);

    const dataSourceRows = [];
    for (const element of form.elements){
      const currentFilter = this.filter.value;
      let modifiedFilter = {
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

      const response = await this.reportingService.fetchData(this.project, computation, [this.dimensionIds.value] , modifiedFilter, true, false);
      console.log(response);

      dataSourceRows.push( {
        icon: true,
        name: element.name,
        baseline: null,
        target: null,
        sectionId,
        values: response
      } as InfoRow )
    }
    return dataSourceRows;
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
}

type Row = SectionTitle | GroupTitle | InfoRow;

// const ELEMENT_DATA: Row[] = [
  // {
  //   title: 'Cross-cutting Indicators',
  //   sectionId: 0,
  //   open: false
  // },
  // {
  //   title: 'Extra indicators',
  //   sectionId: 1,
  //   open: false
  // },
// ];
