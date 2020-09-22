import { Component, OnInit } from '@angular/core';
import { ExtraIndicator } from 'src/app/models/extra-indicator.model';
import { Indicator } from 'src/app/models/indicator';
import { Project } from 'src/app/models/project.model';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-extra-indicators',
  templateUrl: './extra-indicators.component.html',
  styleUrls: ['./extra-indicators.component.scss']
})
export class ExtraIndicatorsComponent implements OnInit {

  extraIndicators: ExtraIndicator[] = [];

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.projectService.openedProject.subscribe((project: Project) => {
      this.extraIndicators = project.extraIndicators;
    });
  }

}
