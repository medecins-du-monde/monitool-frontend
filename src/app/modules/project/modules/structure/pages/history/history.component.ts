import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { ConfirmModalComponent } from 'src/app/components/confirm-modal/confirm-modal.component';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from 'src/app/models/classes/project.model';
import { Revision } from 'src/app/models/classes/revision.model';
import { Operation } from 'fast-json-patch';
import * as jsonpatch from 'fast-json-patch';
import { isEqual } from 'lodash';
import { Form } from 'src/app/models/classes/form.model';
import InformationItem from 'src/app/models/interfaces/information-item';
import BreadcrumbItem from 'src/app/models/interfaces/breadcrumb-item.model';
import { ProjectIndicator } from 'src/app/models/classes/project-indicator.model';
import { Subscription } from 'rxjs';
import { Entity } from 'src/app/models/classes/entity.model';
import { LogicalFrame } from 'src/app/models/classes/logical-frame.model';


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
  saveConfirmElement: number;

  months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

  private projectId: string;
  private project: Project;
  private limit: number;
  private loadedRev: string;
  private loadToken = 0;

  // sameVersion() is called from the template for every row on every change detection
  // cycle. Computing it there means cloning and patching the whole project each time,
  // so the result is computed once per revisions/project change and cached here.
  private sameVersionFlags: boolean[] = [];

  public showLoadMore: boolean;
  public isLoading = false;

  private subscription: Subscription = new Subscription();

  constructor(private projectService: ProjectService,
              private dialog: MatDialog,
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
            value: savedProject.countries,
            isCountry: true,
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
        if (savedProject.region) {
          breadCrumbs.splice(2, 0, 
            {
              value: savedProject.region,
            } as BreadcrumbItem,
          );
        }
        this.projectService.updateBreadCrumbs(breadCrumbs);
        this.saveConfirmElement = undefined;
      })
    );

    this.subscription.add(
      this.projectService.openedProject.subscribe((project: Project) => {
        this.projectId = project.id;
        this.project = project;

        // A revert pushes a patched project into the same BehaviorSubject we listen to.
        // Its rev is unchanged (the backend strips _rev before diffing), so we can tell it
        // apart from a save and keep the revisions the user already loaded.
        if (project.rev === this.loadedRev && this.revisions) {
          this.computeSameVersionFlags();
          this.changeDetector.markForCheck();
          return;
        }

        this.loadedRev = project.rev;
        this.showLoadMore = true;
        this.limit = 10;
        if (project.id && project.rev) {
          this.loadRevisions(this.limit);
        }
      })
    );
    this.projectService.updateInformationPanel(this.informations);
  }

  private async loadRevisions(limit: number): Promise<void> {
    // A load started later always wins: an in-flight request must not clobber the list
    // with stale rows if the project is saved or switched while it is still pending.
    const token = ++this.loadToken;
    this.isLoading = true;
    try {
      const revisions = await this.projectService.listRevisions(this.projectId, limit);
      if (token !== this.loadToken) {
        return;
      }
      // Only commit the limit once the request succeeded, so a failure can be retried
      // on the same page instead of silently skipping ahead.
      this.limit = limit;
      this.decorateRevisions(revisions);
      this.revisions = revisions;
      this.showLoadMore = revisions.length >= this.limit;
      this.computeSameVersionFlags();
    } catch (e) {
      if (token === this.loadToken) {
        console.error('Failed to load revisions', e);
      }
    } finally {
      if (token === this.loadToken) {
        this.isLoading = false;
        this.changeDetector.markForCheck();
      }
    }
  }

  private decorateRevisions(revisions: Revision[]): void {
    revisions.forEach(revision => {
      const newDate = new Date(revision.time);
      revision.displayedTime = [
        newDate.getUTCDate(), this.months[newDate.getMonth()],
        newDate.getFullYear() + ' ' + newDate.toTimeString().split(' ')[0]
      ];
    });
  }

  mouseOver(element){
    this.expandedElement = element;
  }

  // Read by the template — kept O(1), see sameVersionFlags.
  sameVersion(i: number): boolean {
    return this.sameVersionFlags[i] === true;
  }

  private computeSameVersionFlags(): void {
    this.sameVersionFlags = (this.revisions || []).map((_, i) => this.computeSameVersion(i));
  }

  private computeSameVersion(i: number): boolean {
    const patchedProject = this.patchProject(i + 1);
    let equal = false;
    try {
      equal = isEqual(patchedProject.serialize(), this.project.serialize());
    }
    catch {
      equal = isEqual(patchedProject, this.project);
    }
    return equal;
  }

  mouseLeave(){
    this.expandedElement = null;
  }

  onLoadMore() {
    if (this.isLoading) {
      return;
    }
    this.loadRevisions(this.limit + 10);
  }

  patchProject(revisionIndex) {
    const revisedProject = this.project.copy();
    for (let i = 0; i < revisionIndex; i++) {
      try {
        const patch = this.revisions[i].backwards as Operation[];
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
    revisedProject.entities = revisedProject.entities.map(y => new Entity(y));
    revisedProject.forms = revisedProject.forms.map(y => new Form(y, revisedProject.entities));
    revisedProject.extraIndicators = revisedProject.extraIndicators.map(y => new ProjectIndicator(y));
    return revisedProject;
  }

  async onRevertClick(revisionIndex): Promise<void> {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      data: { messageId: 'RevertConfirmation', warning: true }
    });
    // Closing with the X button or the backdrop resolves to undefined, not { confirm: false }.
    const res = await dialogRef.afterClosed().toPromise();
    if (!res?.confirm) {
      return;
    }

    this.saveConfirmElement = revisionIndex;
    const patchedRevision = this.patchProject(revisionIndex + 1);

    // Fix user entities and data sources
    patchedRevision.users = patchedRevision.users.map(user => {
      if (user.entities) {
        user.entities = user.entities.map(entity => {
          if (typeof entity === 'string') {
            entity = patchedRevision.entities.find(el => el.id as any === entity);
          }
          return entity;
        });
      }
      if (user.dataSources) {
        user.dataSources = user.dataSources.map(dataSource => {
          if (typeof dataSource === 'string') {
            dataSource = patchedRevision.forms.find(el => el.id as any === dataSource);
          }
          return dataSource;
        });
      }
      return user;
    });
    // Fix group entities
    patchedRevision.groups = patchedRevision.groups.map(group => {
      if (group.members) {
        group.members = group.members.map(entity => {
          if (typeof entity === 'string') {
            entity = patchedRevision.entities.find(el => el.id as any === entity);
          }
          return entity;
        });
      }
      return group;
    });
    // Fix logical frames
    patchedRevision.logicalFrames = patchedRevision.logicalFrames.map(logFrame => {
      if (logFrame.entities) {
        logFrame.entities = logFrame.entities.map(entity => {
          if (typeof entity === 'string') {
            entity = patchedRevision.entities.find(el => el.id as any === entity);
          }
          return entity;
        });
      }
      return new LogicalFrame(logFrame);
    });

    this.projectService.project.next(patchedRevision);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
