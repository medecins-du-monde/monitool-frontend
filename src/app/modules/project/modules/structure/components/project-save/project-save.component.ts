import { Component } from '@angular/core';
import { Project } from 'src/app/models/classes/project.model';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-project-save',
  templateUrl: './project-save.component.html',
  styleUrls: ['./project-save.component.scss']
})
export class ProjectSaveComponent {
  projectSaved = false;
  errorWhileSaving = false;

  constructor(private projectService: ProjectService) { }

  get hasChanges(): boolean{
    // If the project has no changes anymore and has already been saved
    // then we se the project save infos message to false
    this.projectSaved = !this.projectService.hasPendingChanges && this.projectSaved;
    // If the app has encountered an error but changes have been made
    // then we remove the message
    this.errorWhileSaving = !this.projectService.hasPendingChanges && this.errorWhileSaving;

    return this.projectService.hasPendingChanges;
  }

  get valid(): boolean{
    return this.projectService.valid;
  }

  onSave(): void {
    this.projectService.saveCurrent().then((project: Project) => {
      this.projectService.project.next(project);
      if (this.errorWhileSaving) {
        this.errorWhileSaving = false;
      }
      this.projectSaved = true;
    }).catch(() => this.errorWhileSaving = true);
  }

  onRevert(): void {
    this.projectService.revertChanges();
  }

}
