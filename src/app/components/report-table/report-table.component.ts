import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from 'src/app/models/project.model';
import { MatTableDataSource } from '@angular/material/table';
import { animate, state, style, transition, trigger } from '@angular/animations';

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
  columnsToDisplay = ['icon', 'name', 'baseline', 'target'];
  columnsToDisplayGroup = ['icon', 'groupName'];
  expandedElement: InfoRow | null;

  @Input() dimensions: any[] = [];
  @Input() dimensionsIds: any[] = [];
  @Input() filter: any;
  private subscription: Subscription = new Subscription();
  project: Project;

  isSectionTitle = (index, item: any): item is SectionTitle => (item as SectionTitle).title ? true : false;
  isInfoRow = (index, item: any): item is InfoRow => (item as InfoRow).name ? true : false;
  isGroupTitle = (index, item: any): item is GroupTitle => (item as GroupTitle).groupName ? true : false;

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    console.log(this.dimensionsIds);
    console.log(this.filter);
    this.columnsToDisplay = this.columnsToDisplay.concat(this.dimensions);
    this.subscription.add(
      this.projectService.openedProject.subscribe( (project: Project) => {
        this.project = project;
        this.buildTableRows();
      })
    );
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
        open: false
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
          click: (myId: number) => this.dataSourceToggle(myId),
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

  dataSourceToggle(sectionId: number){
    const newData = [];
    let foundSection = false;
    let open = true;

    for (let row of this.dataSource.data){
      // if the row is unrelated to the click, we just copy it
      if (!foundSection || open || (row as SectionTitle).sectionId !== sectionId){
        newData.push(row);
      }

      row = row as SectionTitle;
      // found the first row with that sectionId
      if ( !foundSection && row.sectionId === sectionId){
        foundSection = true;
        row.open = !row.open;
        open = row.open;

        // if it is open we add data to the table
        if (row.open){
          const form = this.project.forms.find( (myform) => myform.id === row.formId);
          console.log(form);

          for (const element of form.elements){
            console.log(element);
          }
        }
      }
    }
    this.dataSource = new MatTableDataSource(newData);
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

const ELEMENT_DATA: Row[] = [
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
];
