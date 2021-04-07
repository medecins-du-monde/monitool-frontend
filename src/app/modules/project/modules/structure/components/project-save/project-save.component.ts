import { Component } from '@angular/core';;
import { Project } from 'src/app/models/classes/project.model';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-project-save',
  templateUrl: './project-save.component.html',
  styleUrls: ['./project-save.component.scss']
})
export class ProjectSaveComponent {
  projectSaved = false;

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
      this.projectSaved = true;
    });
  }

  onRevert(): void {
    this.projectService.revertChanges();
  }

}
