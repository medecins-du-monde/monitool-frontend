import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { map } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { LogicalFrame } from 'src/app/models/classes/logical-frame.model';
import { Project } from 'src/app/models/classes/project.model';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-logframes-dashboard',
  templateUrl: './logframes-dashboard.component.html',
  styleUrls: ['./logframes-dashboard.component.scss']
})
export class LogframesDashboardComponent implements OnInit {

  public logicalFrame: LogicalFrame;
  public project: Project;
  public displayActivity = false;

  constructor(private projectService: ProjectService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    combineLatest([this.projectService.openedProject, this.route.paramMap]).pipe(
      map(results => ({ project: results[0], logicalFrameId: (results[1] as ParamMap).get('id') }))
    ).subscribe((res: { project: Project, logicalFrameId: string }) => {
      this.project = res.project;
      const oldLogicalFrame = this.logicalFrame;
      this.logicalFrame = res.project.logicalFrames.find(x => x.id === res.logicalFrameId);
      /*
      if (!this.logicalFrame) {
        this.router.navigate(['..'], { relativeTo: this.route });
      } else if ( !oldLogicalFrame || !oldLogicalFrame.equals(this.logicalFrame) ) {
        this.entities = res.project.entities;
        this.groups = res.project.groups;
        this.setForm();
      }*/
    });
  }

  displayActivities() {
    this.displayActivity = !this.displayActivity;
  }

}
