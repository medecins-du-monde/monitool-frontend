import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Entity } from 'src/app/models/classes/entity.model';
import { LogicalFrame } from 'src/app/models/classes/logical-frame.model';
import { Project } from 'src/app/models/classes/project.model';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-logical-frames',
  templateUrl: './logical-frames.component.html',
  styleUrls: ['./logical-frames.component.scss']
})
export class LogicalFramesComponent implements OnInit, OnDestroy {

  project: Project;
  logicalFrames: LogicalFrame[] = [];
  currentLogicalFrame: LogicalFrame;
  entities: Entity[];
  edition = false;

  private subscription: Subscription = new Subscription();

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.subscription.add(
      this.projectService.openedProject.subscribe((project: Project) => {
        this.project = project;
        this.logicalFrames = project.logicalFrames;
        this.entities = project.entities;
        if ( this.currentLogicalFrame ) {
          this.currentLogicalFrame = this.logicalFrames.find(x => x.id === this.currentLogicalFrame.id);
          if (this.currentLogicalFrame === undefined){
            this.onCreate();
          }
        }
      })
    )
  }

  onCreate(): void {
    this.currentLogicalFrame = new LogicalFrame();
    this.project.logicalFrames.push(this.currentLogicalFrame);
    this.projectService.project.next(this.project);
    this.projectService.valid = false;
    this.edition = true;
  }

  onClone(logicalFrame: LogicalFrame): void {
    this.currentLogicalFrame = new LogicalFrame(logicalFrame.serialize());
    this.project.logicalFrames.push(this.currentLogicalFrame);
    this.projectService.project.next(this.project);
    this.edition = true;
  }

  onEdit(logicalFrame: LogicalFrame) {
    this.edition = true;
    this.currentLogicalFrame = logicalFrame;
    this.projectService.project.next(this.project);
  }

  onDelete(logicalFrame: LogicalFrame) {
    this.project.logicalFrames = this.project.logicalFrames.filter(x => x.id !== logicalFrame.id);
    this.projectService.project.next(this.project);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
