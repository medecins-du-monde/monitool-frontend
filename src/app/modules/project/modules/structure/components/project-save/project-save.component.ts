import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Project } from 'src/app/models/classes/project.model';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-project-save',
  templateUrl: './project-save.component.html',
  styleUrls: ['./project-save.component.scss']
})
export class ProjectSaveComponent {

  private currentProject: Project;

  private subscription: Subscription = new Subscription();

  constructor(private projectService: ProjectService) { }

  get hasChanges(): boolean{
    return this.projectService.hasPendingChanges;
  }

  get valid(): boolean{
    return this.projectService.valid;
  }

  onSave(): void {
    this.projectService.saveCurrent().then((project: Project) => {
      this.projectService.project.next(project);
    });
  }

  onRevert(): void {
    this.projectService.revertChanges();
  }

}
