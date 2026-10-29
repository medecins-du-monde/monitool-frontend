import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { Subscription } from 'rxjs';
import { Project } from 'src/app/models/classes/project.model';
import { User } from 'src/app/models/classes/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { ProjectService } from 'src/app/services/project.service';
import ProjectRoleHelper from 'src/app/utils/project-role-helper';
import { RemoveCloneTagModalComponent } from './remove-clone-tag-modal/remove-clone-tag-modal.component';

/**
 * Shown on every page of a cloned project until its owner removes the Clone tag.
 */
@Component({
  selector: 'app-clone-banner',
  templateUrl: './clone-banner.component.html',
  styleUrls: ['./clone-banner.component.scss']
})
export class CloneBannerComponent implements OnInit, OnDestroy {

  project: Project;
  user: User;

  private subscription: Subscription = new Subscription();

  constructor(
    private projectService: ProjectService,
    private authService: AuthService,
    private dialog: MatDialog,
  ) { }

  get isOwner(): boolean {
    return ProjectRoleHelper.isProjectAdmin(this.user, this.project);
  }

  get hasPendingChanges(): boolean {
    return this.projectService.hasPendingChanges;
  }

  ngOnInit(): void {
    this.subscription.add(
      this.authService.currentUser.subscribe((user: User) => this.user = new User(user))
    );
    this.subscription.add(
      this.projectService.lastSavedVersion.subscribe((project: Project) => this.project = project)
    );
  }

  onRemoveCloneTag(): void {
    this.dialog.open(RemoveCloneTagModalComponent, { data: { project: this.project }, maxWidth: '800px' });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
