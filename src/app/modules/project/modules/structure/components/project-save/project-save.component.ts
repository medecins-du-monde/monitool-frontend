import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Project } from 'src/app/models/project.model';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-project-save',
  templateUrl: './project-save.component.html',
  styleUrls: ['./project-save.component.scss']
})
export class ProjectSaveComponent implements OnInit, OnDestroy {

  private savedProject: Project;
  private currentProject: Project;

  public changed = false;

  private subscription: Subscription = new Subscription();

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.subscription.add(
      this.projectService.openedProject.subscribe((project: Project) => {
        if (!this.savedProject) {
          this.savedProject = project.copy();
          this.currentProject = project.copy();
        } else {
          if ( project.id !== this.savedProject.id ) {
            this.savedProject = project.copy();
            this.currentProject = project.copy();
          } else {
            this.currentProject = project.copy();
          }
        }
        this.changed = !this.savedProject.equals(this.currentProject);
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSave() {
    this.projectService.save(this.currentProject).then((project: Project) => {
      this.savedProject = project.copy();
      this.projectService.project.next(project);
    });
  }

}
