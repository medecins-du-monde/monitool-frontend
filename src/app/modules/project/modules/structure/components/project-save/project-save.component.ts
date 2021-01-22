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

  private currentProject: Project;

  private subscription: Subscription = new Subscription();

  constructor(private projectService: ProjectService) { }

  get hasChanges(): boolean{
    return this.projectService.hasPendingChanges;
  }

  ngOnInit(): void {
    this.subscription.add(
      this.projectService.openedProject.subscribe((project: Project) => {
        this.currentProject = project;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSave(): void {
    this.projectService.save(this.currentProject).then((project: Project) => {
      this.projectService.project.next(project);
    });
  }

  onRevert(): void {
    this.projectService.discardPendingChanges();
  }

}
