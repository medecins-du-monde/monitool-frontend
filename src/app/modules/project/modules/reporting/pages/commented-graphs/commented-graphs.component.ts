import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LogicalFrame } from 'src/app/models/classes/logical-frame.model';
import { Project } from 'src/app/models/classes/project.model';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-commented-graphs',
  templateUrl: './commented-graphs.component.html',
  styleUrls: ['./commented-graphs.component.scss']
})
export class CommentedGraphsComponent implements OnInit {

  project: Project;
  logicalFrames: LogicalFrame[] = [];

  constructor(private projectService: ProjectService, private router: Router) { }

  ngOnInit(): void {
    this.projectService.openedProject.subscribe((project: Project) => {
      this.project = project;
      this.logicalFrames = project.logicalFrames;
    });
  }

  goToDashboard(logframe: LogicalFrame) {
    this.router.navigate([`${this.router.url}/${logframe.id}`]);
  }

}
