import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Entity } from 'src/app/models/classes/entity.model';
import { LogicalFrame } from 'src/app/models/classes/logical-frame.model';
import { Project } from 'src/app/models/classes/project.model';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-logical-frames-list',
  templateUrl: './logical-frames-list.component.html',
  styleUrls: ['./logical-frames-list.component.scss']
})
export class LogicalFramesListComponent implements OnInit {

  project: Project;
  logicalFrames: LogicalFrame[] = [];

  constructor(
    private projectService: ProjectService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.projectService.openedProject.subscribe((project: Project) => {
      this.project = project;
      this.logicalFrames = project.logicalFrames;
    });
  }

  onCreate(): void {
    const newLogicalFrame = new LogicalFrame();
    this.project.logicalFrames.push(newLogicalFrame);
    this.projectService.project.next(this.project);
    this.router.navigate([`${this.router.url}/${newLogicalFrame.id}`]);
  }

  onClone(logicalFrame: LogicalFrame): void {
    const clonedLogicalFrame = new LogicalFrame(logicalFrame.serialize());
    this.project.logicalFrames.push(clonedLogicalFrame);
    this.projectService.project.next(this.project);
    this.router.navigate([`${this.router.url}/${clonedLogicalFrame.id}`]);
  }

  onEdit(logicalFrame: LogicalFrame): void {
    this.projectService.project.next(this.project);
    this.router.navigate([`${this.router.url}/${logicalFrame.id}`]);
  }

  onDelete(logicalFrame: LogicalFrame): void {
    this.project.logicalFrames = this.project.logicalFrames.filter(x => x.id !== logicalFrame.id);
    this.projectService.project.next(this.project);
  }

  // drag and drop function on a list than can span accross multiple rows
  drop(event: CdkDragDrop<any>): void {
    this.logicalFrames[event.previousContainer.data.index] = event.container.data.logicalFrame;
    this.logicalFrames[event.container.data.index] = event.previousContainer.data.logicalFrame;
    event.currentIndex = 0;
    this.projectService.project.next(this.project);
  }

}
