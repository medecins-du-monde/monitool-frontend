import { Component, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from 'src/app/models/project.model';
import { Revision } from 'src/app/models/revision.model';
import { Operation, compare } from 'fast-json-patch';
import * as jsonpatch from 'fast-json-patch';
import { isEqual } from 'lodash';
import { Form } from 'src/app/models/form.model';


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
  revisions: Revision[];

  expandedElement: null;
  isSameVersion: boolean;
  showSaveConfirm: boolean;
  saveConfirmElement: number;

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
        this.revisions = revisions;
        this.showLoadMore = revisions.length < 10 ? false : true;
      });
    });
  }

  mouseOver(element){
    this.expandedElement = element;
  }

  sameVersion(i){
    const patchedProject = this.patchProject(i);
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
      this.revisions = revisions;
      this.showLoadMore = revisions.length < 10 ? false : true;
    });
  }

  patchProject(revisionIndex) {
    let revisedProject = this.project.copy();
    for (let i = 0; i < revisionIndex; i++) {
      try {
        const patch = this.revisions[i].backwards;
        jsonpatch.applyPatch(revisedProject, patch as Operation[]).newDocument;
      } catch (e) {
        console.log("Error in reverting to datasource at Index ", i);
        console.log(e);
      }
    }
    revisedProject.forms = revisedProject.forms.map(y => new Form(y));
    return revisedProject;
  }

  expand(element) {
    return this.saveConfirmElement === element ? true : false;
  }

  onRevertClick(revisionIndex) {
    this.saveConfirmElement = revisionIndex;
    const patchedRevision = this.patchProject(revisionIndex+1);

    patchedRevision.forms = patchedRevision.forms.map(y => new Form(y));
    this.projectService.project.next(patchedRevision);
  }

}
