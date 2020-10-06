import { Component, OnInit } from '@angular/core';
import { LogicalFrame } from 'src/app/models/logical-frame.model';
import { Project } from 'src/app/models/project.model';
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
  edition = false;

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.projectService.openedProject.subscribe((project: Project) => {
      this.project = project;
      this.logicalFrames = project.logicalFrames;
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

  onEdit(logicalFrame: LogicalFrame) {
    this.edition = true;
    this.currentLogicalFrame = logicalFrame;
    this.projectService.project.next(this.project);
  }

  onDelete(logicalFrame: LogicalFrame) {
    this.project.logicalFrames = this.project.logicalFrames.filter(x => x.id !== logicalFrame.id);
    this.projectService.project.next(this.project);
  }

}
