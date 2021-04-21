import { Component } from '@angular/core';
import { Project } from 'src/app/models/classes/project.model';
import { User } from 'src/app/models/classes/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { ProjectService } from 'src/app/services/project.service';
import { SidenavService } from 'src/app/services/sidenav.service';

@Component({
  selector: 'app-project-save',
  templateUrl: './project-save.component.html',
  styleUrls: ['./project-save.component.scss']
})
export class ProjectSaveComponent {
  projectSaved = false;
  errorWhileSaving = false;
  currentUser: User;

  constructor(
    private projectService: ProjectService,
    private authService: AuthService,
    private sidenavService: SidenavService,
    ) { }

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

  onSave(): void {
    this.projectService.saveCurrent().then((project: Project) => {
      this.projectService.project.next(project);
      this.authService.currentUser.subscribe((user: User) => this.currentUser = user );
      this.sidenavService.generateSidenav(this.currentUser, project);
      if (this.errorWhileSaving) {
        this.errorWhileSaving = false;
      }
      this.projectSaved = true;
    }).catch(() => {
      this.errorWhileSaving = true;
    });
  }

  onRevert(): void {
    this.projectService.revertChanges();
  }

}
