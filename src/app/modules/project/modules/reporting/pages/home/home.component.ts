import { Component, OnInit } from '@angular/core';
import InformationItem from 'src/app/models/interfaces/information-item';
import { Project } from 'src/app/models/classes/project.model';
import BreadcrumbItem from 'src/app/models/interfaces/breadcrumb-item.model';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  informations = [
    {
      res1: 'InformationPanel.General_reporting_home',
      res2: ''
    } as InformationItem
  ];

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.projectService.openedProject.subscribe((project: Project) => {
      const breadCrumbs = [
        {
          value: 'Projects',
          link: './../../projects'
        } as BreadcrumbItem,
        {
          value: project.country,
        } as BreadcrumbItem,
        {
          value: project.name,
        } as BreadcrumbItem,
        {
          value: 'Reporting',
        } as BreadcrumbItem,
      ];
      this.projectService.updateBreadCrumbs(breadCrumbs);
    });
    this.projectService.updateInformationPanel(this.informations);
  }

}
