import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { Project } from 'src/app/models/classes/project.model';
import { User } from 'src/app/models/classes/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { ProjectService } from 'src/app/services/project.service';
import { ActionProjectModalComponent } from '../action-project-modal/action-project-modal.component';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})

export class ProjectComponent implements OnInit, OnDestroy {

  @Input() project: Project;
  @Output() delete = new EventEmitter();
  @Output() restore = new EventEmitter();
  @Output() clone = new EventEmitter();
  @Output() cloneWithData = new EventEmitter();
  @Output() getProjects: EventEmitter<any> = new EventEmitter();

  currentUser: User;
  projectOwner: boolean;
  lastEntry: string;

  private subscription: Subscription = new Subscription();

  get currentLang(): string {
    return this.translateService.currentLang ? this.translateService.currentLang : this.translateService.defaultLang;
  }

  constructor(
    private translateService: TranslateService,
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog,
    private projectService: ProjectService,
  ) { }

  ngOnInit(): void {
    this.subscription.add(
      this.authService.currentUser.subscribe((user: User) => {
        this.currentUser = new User(user);
        this.projectOwner = (this.project.users.filter(projectUser => projectUser.id === this.currentUser.id).length > 0);
      })
    );
  }

  onOpen(): void {
    // Get the project id to redirect MDM Account properly if needed
    this.projectService.updateProjectId(this.project.id);
    this.router.navigate(['/projects', this.project.id]);
  }

  showAction() {
    if (this.canClone() || this.canDelete() || this.canRestore()) {
      return true;
    }
    return false;
  }

  onDelete(): void {
    const dialogRef = this.dialog.open(ActionProjectModalComponent, { data: {title: 'DeleteProject', infos: 'DeleteProjectInfo'} } );

    const dialogSubscription = dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.delete.emit(this.project);
        dialogSubscription.unsubscribe();
      }
    });
  }

  canDelete() {
    /**
     * to hide/show 'delete button' in project action
     */
    if (this.currentUser.type === 'user') {
      // admin role
      if (this.currentUser.role === 'admin') {
        return true;
      }
      // common role
      if (this.currentUser.role === 'common') {
        return false;
      }
      // project-creation role
      if (this.currentUser.role === 'project') {
        // can only delete its own projects.
        if (this.projectOwner === true) {
          return true;
        }
        return false;
      }
    }
    return false;
  }

  onRestore(): void {
    this.restore.emit(this.project);
  }

  canRestore() {
    /**
     * to hide/show 'restore button' in project action
    */
    if (this.currentUser.type === 'user') {
      // admin role
      if (this.currentUser.role === 'admin') {
        // admin can restore any projects
        return true;
      }
      // common role
      if (this.currentUser.role === 'common') {
        // common-role cant restore assigned project
        return false;
      }
      // project-creation role
      if (this.currentUser.role === 'project') {
        // can restore its own projects.
        if (this.projectOwner === true) {
          return true;
        }
        return false;
      }
    }
    return false;
  }

  onClone(): void {
    const dialogRef = this.dialog.open(ActionProjectModalComponent, { data: {title: 'CloneProject', infos: 'CloneProjectInfo'} } );

    const dialogSubscription = dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.clone.emit(this.project);
        dialogSubscription.unsubscribe();
      }
    });
  }

  canClone() {
    /**
     * to hide/show 'clone button' in project action
    */
    if (this.currentUser.type === 'user') {
      // admin role
      if (this.currentUser.role === 'admin') {
        return true;
      }
      // common role
      if (this.currentUser.role === 'common') {
        return false;
      }
      // project-creation role
      if (this.currentUser.role === 'project') {
        // can only delete its own projects.
        if (this.projectOwner === true) {
          return true;
        }
        return false;
      }
    }
    return false;
  }

  onCloneWithData(): void {
    const dialogRef = this.dialog.open(ActionProjectModalComponent, { data: {title: 'CloneProject', infos: 'CloneProjectInfoData'} } );

    const dialogSubscription = dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.cloneWithData.emit(this.project);
        dialogSubscription.unsubscribe();
      }
    });
  }

  projectCardAvatar(): string {
    if (this.projectOwner) {
      return 'person';
    }
    else if (localStorage.getItem('user::' + this.currentUser.id + 'favorite' + this.project.id)) {
      return 'star';
    } else {
      return 'star_border';
    }
  }

  toggleFavourite(): void {
    if (!this.projectOwner) {
      this.getProjects.emit();
      if (!localStorage.getItem('user::' + this.currentUser.id + 'favorite' + this.project.id)) {
        localStorage.setItem('user::' + this.currentUser.id + 'favorite' + this.project.id, 'true');
      } else {
        localStorage.removeItem('user::' + this.currentUser.id + 'favorite' + this.project.id);
      }
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
