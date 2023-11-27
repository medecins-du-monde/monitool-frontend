import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from 'src/app/models/classes/project.model';
import { Revision } from 'src/app/models/classes/revision.model';
import { Operation } from 'fast-json-patch';
import * as jsonpatch from 'fast-json-patch';
import { isEqual } from 'lodash';
import { Form } from 'src/app/models/classes/form.model';
import InformationItem from 'src/app/models/interfaces/information-item';
import BreadcrumbItem from 'src/app/models/interfaces/breadcrumb-item.model';
import { TranslateService } from '@ngx-translate/core';
import { ProjectIndicator } from 'src/app/models/classes/project-indicator.model';
import { Subscription } from 'rxjs';


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
export class HistoryComponent implements OnInit, OnDestroy {

  informations = [
    {
      res1: 'InformationPanel.History',
      res2: 'InformationPanel.History_description'
    } as InformationItem,
    {
      res1: 'InformationPanel.General_Naming_convention_question',
      res2: 'InformationPanel.General_Naming_convention_response'
    } as InformationItem,
    {
      res1: 'InformationPanel.General_accidental_delete_question',
      res2: 'InformationPanel.General_accidental_delete_response'
    } as InformationItem,
    {
      res1: 'InformationPanel.General_delete_saved_question',
      res2: 'InformationPanel.General_delete_saved_response'
    } as InformationItem,
    {
      res1: 'InformationPanel.History_question1',
      res2: 'InformationPanel.History_response1'
    } as InformationItem,
    {
      res1: 'InformationPanel.History_question2',
      res2: 'InformationPanel.History_response2'
    } as InformationItem
  ];

  displayedColumns: string[] = ['date', 'changes'];
  revisions: Revision[];

  expandedElement: null;
  isSameVersion: boolean;
  showSaveConfirm: boolean;
  saveConfirmElement: number;

  months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

  private projectId: string;
  private project: Project;
  private limit: number;

  public showLoadMore: boolean;

  private subscription: Subscription = new Subscription();

  constructor(private projectService: ProjectService,
              private translateService: TranslateService,
              private changeDetector: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.subscription.add(
      this.projectService.lastSavedVersion.subscribe((savedProject: Project) => {
        const breadCrumbs = [
          {
            value: 'Projects',
            link: './../../projects'
          } as BreadcrumbItem,
          {
            value: savedProject.country,
          } as BreadcrumbItem,
          {
            value: savedProject.name,
          } as BreadcrumbItem,
          {
            value: 'Structure',
          } as BreadcrumbItem,
          {
            value: 'History',
          } as BreadcrumbItem,
        ];
        this.projectService.updateBreadCrumbs(breadCrumbs);
        this.saveConfirmElement = undefined;
      })
    );

    this.subscription.add(
      this.projectService.openedProject.subscribe((project: Project) => {
        this.showLoadMore = true;
        this.projectId = project.id;
        this.project = project;
        this.limit = 10;
        if (project.id && project.rev) {
          this.projectService.listRevisions(project.id, this.limit).then((revisions: Revision[]) => {
            const language = this.translateService.currentLang ? this.translateService.currentLang : this.translateService.defaultLang;
            revisions.forEach(revision => {
              const timeArr = [];
              const newDate = new Date(revision.time);
              timeArr.push(
                newDate.getUTCDate(), this.months[newDate.getMonth()],
                newDate.getFullYear() + ' ' + newDate.toTimeString().split(' ')[0]
              );
              revision.displayedTime = timeArr;
            });
            this.revisions = revisions;
            this.showLoadMore = revisions.length < 10 ? false : true;
            this.changeDetector.markForCheck();
          });
        }
      })
    );
    this.projectService.updateInformationPanel(this.informations);
  }

  mouseOver(element){
    this.expandedElement = element;
  }
  
  sameVersion(i){
    const patchedProject = this.patchProject(i + 1);
    let equal = false;
    try {
      equal = isEqual(patchedProject.serialize(), this.project.serialize());
    }
    catch {
      equal = isEqual(patchedProject, this.project);
    }
    // console.log(patchedProject.serialize(), this.project.serialize());
    this.isSameVersion = equal;
    return (equal);
  }

  mouseLeave(){
    this.expandedElement = null;
  }

  onLoadMore() {
    this.limit += 10;
    this.projectService.listRevisions(this.projectId, this.limit).then((revisions: Revision[]) => {
      revisions.forEach(revision => {
        const timeArr = [];
        const newDate = new Date(revision.time);
        timeArr.push(newDate.getUTCDate(), this.months[newDate.getMonth()],
        newDate.getFullYear() + ' ' + newDate.toTimeString().split(' ')[0]);
        revision.displayedTime = timeArr;
      });
      this.revisions = revisions;
      this.showLoadMore = revisions.length < 10 ? false : true;
    });
  }

  patchProject(revisionIndex, log?) {
    const revisedProject = this.project.copy();
    for (let i = 0; i < revisionIndex; i++) {
      try {
        const patch = this.revisions[i].backwards as Operation[];
        if (log) console.log(patch)
        jsonpatch.applyPatch(revisedProject, patch);
      } catch (e) {
        console.log('Error in reverting to datasource at index ', i);
        console.log(e);
      }
    }
    revisedProject.entities.map(entity => {
      if (typeof entity.start === 'string') {
        entity.start = new Date(entity.start);
      }
      if (typeof entity.end === 'string') {
        entity.end = new Date(entity.end);
      }
    });
    revisedProject.forms = revisedProject.forms.map(y => new Form(y, this.project.entities));
    return revisedProject;
  }

  expand(element) {
    return this.saveConfirmElement === element ? true : false;
  }

  onRevertClick(revisionIndex) {
    this.saveConfirmElement = revisionIndex;
    const patchedRevision = this.patchProject(revisionIndex + 1, true);

    patchedRevision.forms = patchedRevision.forms.map(y => new Form(y));
    patchedRevision.extraIndicators = patchedRevision.extraIndicators.map(y => new ProjectIndicator(y));
    this.projectService.project.next(patchedRevision);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
