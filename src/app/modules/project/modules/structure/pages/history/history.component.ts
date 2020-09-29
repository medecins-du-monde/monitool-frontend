import { Component, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from 'src/app/models/project.model';
import { Revision } from 'src/app/models/revision.model';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', padding: '0px'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class HistoryComponent implements OnInit {
  displayedColumns: string[] = ['date', 'changes'];
  dataSource: Revision[];

  expandedElement: null;

  private projectId: string;

  private offset: number;
  private limit: number;

  public showLoadMore: boolean;

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.projectService.openedProject.subscribe((project: Project) => {
      this.showLoadMore = true;
      this.projectId = project.id;
      this.offset = 0;
      this.limit = 10;
      this.projectService.listRevisions(this.projectId, this.offset, this.limit).then((revisions: Revision[]) => {
        this.dataSource = revisions;
        this.showLoadMore = revisions.length < 10 ? false : true;
      });
    });
  }

  mouseOver(element){
    this.expandedElement = element;
  }

  mouseLeave(){
    this.expandedElement = null;
  }

  onLoadMore() {
    this.offset += 10;
    this.limit += 10;
    this.projectService.listRevisions(this.projectId, this.offset, this.limit).then((revisions: Revision[]) => {
      this.dataSource = revisions;
      this.showLoadMore = revisions.length < 10 ? false : true;
    });
  }

}
