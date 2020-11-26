import { Component, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from 'src/app/models/project.model';
import { Revision } from 'src/app/models/revision.model';
import { Operation, compare } from 'fast-json-patch';
import * as jsonpatch from 'fast-json-patch';
import { isEqual } from 'lodash';


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
  isSameVersion: boolean;
  showSaveConfirm: boolean;
  saveConfirmElement: null;

  private projectId: string;
  private project: Project;

  private offset: number;
  private limit: number;

  public showLoadMore: boolean;

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.projectService.openedProject.subscribe((project: Project) => {
      this.showLoadMore = true;
      this.projectId = project.id;
      this.project = project;
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

  sameVersion(i){
    let patchedProject = this.patchProject(i);
    const equal = isEqual(patchedProject, this.project);
    this.isSameVersion = equal;
    return (equal);
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

  patchProject(revisionIndex) {
    let revisedProject = this.project.copy();
    for (let i = 1; i <= revisionIndex; i++) {
      const patch = this.dataSource[i].backwards;
      const test = jsonpatch.applyPatch(revisedProject, patch as Operation[]).newDocument;
    }
    return revisedProject;
  }

  expand(element) {
    return this.saveConfirmElement === element ? true : false;
  }

  onRevertClick(revisionIndex, element) {
    this.saveConfirmElement = element;
    const patchedRevision = this.patchProject(revisionIndex);
    this.projectService.project.next(patchedRevision);
  }

}
