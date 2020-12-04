import { Component, OnInit, OnDestroy } from '@angular/core';
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
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  columnsToDisplay = ['icon', 'name', 'baseline', 'target'];
  expandedElement: InfoRow | null;

  private subscription: Subscription = new Subscription();
  project: Project;

  isSectionTitle = (index, item: any): item is SectionTitle => (item as SectionTitle).title ? true : false;
  isInfoRow = (index, item: any): item is InfoRow => (item as InfoRow).name ? true : false;

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.subscription.add(
      this.projectService.openedProject.subscribe( (project: Project) => {
        this.project = project;

        const newData = ELEMENT_DATA;
        let id = 2;
        for (const form of this.project.forms){
          newData.push(
            {
              title: `Data source: ${form.name}`,
              sectionId: id,
              opened: false
            }
          );
          id += 1;
        }
        this.dataSource = new MatTableDataSource(newData);
      })
    );
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // this replace the current datasource with a new one, adding or removing rows as needed
  toggleData(sectionId: number){
    const newData = [];
    let foundSection = false;
    let opened = true;

    for (const row of this.dataSource.data){
      if (!foundSection || opened || (row as SectionTitle).sectionId !== sectionId){
        newData.push(row);
      }

      if ( !foundSection && (row as SectionTitle).sectionId === sectionId){
        foundSection = true;
        (row as SectionTitle).opened = !(row as SectionTitle).opened;
        opened = (row as SectionTitle).opened;
        // if it is opened we add data to the table
        if ((row as SectionTitle).opened){
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
}

export interface SectionTitle{
  title: string;
  sectionId: number;
  opened: boolean;
}

export interface GroupTitle{
  icon: boolean;
  groupName: string;
}

export interface InfoRow {
  icon: boolean;
  name: string;
  baseline: number | null;
  target: number | null;
  sectionId: number;
}

type Row = SectionTitle | GroupTitle | InfoRow;

const ELEMENT_DATA: Row[] = [
  {
    title: 'Cross-cutting Indicators',
    sectionId: 0,
    opened: false
  },
  {
    title: 'Extra indicators',
    sectionId: 1,
    opened: false
  },
];
