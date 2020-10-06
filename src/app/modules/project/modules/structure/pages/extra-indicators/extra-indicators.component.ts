import { Component, OnInit } from '@angular/core';
import { ProjectIndicator } from 'src/app/models/project-indicator.model';
import { Project } from 'src/app/models/project.model';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-extra-indicators',
  templateUrl: './extra-indicators.component.html',
  styleUrls: ['./extra-indicators.component.scss']
})
export class ExtraIndicatorsComponent implements OnInit {

  extraIndicators: ProjectIndicator[] = [];

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.projectService.openedProject.subscribe((project: Project) => {
      this.extraIndicators = project.extraIndicators;
    });
  }

}
