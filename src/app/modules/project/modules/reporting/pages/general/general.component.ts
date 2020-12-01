import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project.model';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})

export class GeneralComponent implements OnInit {

  protected project: Project;
  grouping = 'Semester';
  startDate: Date;

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.projectService.openedProject.subscribe((project: Project) => {
      this.project = project;
      const currentYear = project.start.getFullYear(); //we assume it is first day of year of the project start
      this.startDate = new Date(currentYear, 0, 1);
    });
  }

  setGrouping(event) {
    this.grouping = event.value;
  }

}
