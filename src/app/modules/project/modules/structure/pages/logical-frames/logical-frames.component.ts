import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Entity } from 'src/app/models/classes/entity.model';
import { LogicalFrame } from 'src/app/models/classes/logical-frame.model';
import { Project } from 'src/app/models/classes/project.model';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-logical-frames',
  templateUrl: './logical-frames.component.html',
  styleUrls: ['./logical-frames.component.scss']
})
export class LogicalFramesComponent implements OnInit {

  project: Project;
  logicalFrames: LogicalFrame[] = [];
  currentLogicalFrame: LogicalFrame;
  entities: Entity[];
  edition = false;

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.projectService.openedProject.subscribe((project: Project) => {
      this.project = project;
      this.logicalFrames = project.logicalFrames;
      this.entities = project.entities;
      if ( this.currentLogicalFrame ) {
        this.currentLogicalFrame = this.logicalFrames.find(x => x.id === this.currentLogicalFrame.id);
      }
    });
  }

  onCreate(): void {
    this.currentLogicalFrame = new LogicalFrame();
    this.project.logicalFrames.push(this.currentLogicalFrame);
    this.projectService.project.next(this.project);
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

  drop(event: CdkDragDrop<any>) {
    this.logicalFrames[event.previousContainer.data.index] = event.container.data.logicalFrame;
    this.logicalFrames[event.container.data.index] = event.previousContainer.data.logicalFrame;
    event.currentIndex = 0;
    this.projectService.project.next(this.project);
  }

}
