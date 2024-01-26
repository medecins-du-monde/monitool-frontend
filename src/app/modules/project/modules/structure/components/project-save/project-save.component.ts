import {Component, ChangeDetectorRef, OnInit, OnDestroy, Input} from '@angular/core';
import { Project } from 'src/app/models/classes/project.model';
import { User } from 'src/app/models/classes/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { ProjectService } from 'src/app/services/project.service';
import { SidenavService } from 'src/app/services/sidenav.service';
import moment from 'moment/moment';
import {ConfirmModalComponent} from '../../../../../../components/confirm-modal/confirm-modal.component';
import {map} from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-project-save',
  templateUrl: './project-save.component.html',
  styleUrls: ['./project-save.component.scss']
})
export class ProjectSaveComponent implements OnInit, OnDestroy {
  projectSaved = false;
  errorWhileSaving = false;
  currentUser: User;
  savedProject: Project;
  currentProject: Project;

  private storedProject: Project;

  @Input() reload = true;

  private subscription: Subscription = new Subscription();

  constructor(
    private projectService: ProjectService,
    private authService: AuthService,
    private sidenavService: SidenavService,
    private changeDetector: ChangeDetectorRef,
    private dialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.subscription.add(
      this.projectService.openedProject.subscribe(project => {
        this.currentProject = project;
      })
    );
    this.subscription.add(
      this.projectService.savedProject.subscribe(project => {
        this.savedProject = project;
      })
    );
  }

  get hasChanges(): boolean{
    // If the project has no changes anymore and has already been saved
    // then we remove the message
    if (this.projectService.hasPendingChanges && this.projectSaved) {
      this.projectSaved = false;
    }

    return this.projectService.hasPendingChanges;
  }

  get valid(): boolean{
    return this.projectService.valid;
  }

  get errorMessage(): any{
    return this.projectService.errorMessage;
  }

  get warningMessage(): any{
    return this.projectService.warningMessage;
  }

  async onSave(): Promise<void> {
    if (moment(this.currentProject.end).isBefore(this.savedProject.end)) {
      const dialogRef = this.dialog.open(ConfirmModalComponent, {data: {messageId: 'ProjectDataLossConfirmation'}});
      const confirm = await dialogRef.afterClosed().pipe(map(res => res.confirm)).toPromise();
      if (!confirm) {
        return;
      }
    }
    this.projectService.saveCurrent().then((project: Project) => {
      if (this.reload) {
        this.projectService.project.next(project);
      } else {
        this.storedProject = project;
      }
      this.subscription.add(
        this.authService.currentUser.subscribe((user: User) => this.currentUser = user )
      );
      this.sidenavService.generateSidenav(this.currentUser, project);
      if (this.errorWhileSaving) {
        this.errorWhileSaving = false;
      }
      this.projectSaved = true;
      this.changeDetector.markForCheck();
    }).catch((fullerror) => {
      this.errorWhileSaving = true;
      console.log(fullerror);
    });
  }

  onRevert(): void {
    this.projectService.revertChanges();
  }

  ngOnDestroy(): void {
    if (!this.reload && this.storedProject) {
      this.projectService.project.next(this.storedProject);
    }
    this.subscription.unsubscribe();
  }

}
