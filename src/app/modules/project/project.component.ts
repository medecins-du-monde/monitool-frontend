import { Component, OnInit } from '@angular/core';
import { Sidenav } from 'src/app/models/sidenav.model';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from 'src/app/models/project.model';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  public sidenav: Sidenav;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const projectId = params.id;
      this.projectService.get(projectId).then((project: Project) => {
        this.projectService.project.next(project);
      });
      this.sidenav = {
        groups: [
          {
            title: 'Structure',
            collapsible: true,
            items: [
              {
                name: 'Home',
                routerLink: `../${projectId}/structure/home`,
                icon: 'home'
              },
              {
                name: 'Basics',
                routerLink: `../${projectId}/structure/basics`,
                icon: 'database'
              },
              {
                name: 'CollectionSites',
                routerLink: `../${projectId}/structure/sites`,
                icon: 'location'
              },
              {
                name: 'DataSources',
                routerLink: `../${projectId}/structure/data-sources`,
                icon: 'folder'
              },
              {
                name: 'LogicalFrameworks',
                routerLink: `../${projectId}/structure/logical-frame`,
                icon: 'clipboard'
              },
              {
                name: 'CrossCuttingIndicators',
                routerLink: `../${projectId}/structure/cross-cutting`,
                icon: 'gauge'
              },
              {
                name: 'ExtraIndicators',
                routerLink: `../${projectId}/structure/extra-indicators`,
                icon: 'gauge'
              },
              {
                name: 'Users',
                routerLink: `../${projectId}/structure/users`,
                icon: 'people'
              },
              {
                name: 'History',
                routerLink: `../${projectId}/structure/history`,
                icon: 'history'
              }
            ]
          },
          {
            title: 'Input',
            collapsible: true,
            items: [
              {
                name: 'Home',
                routerLink: `../${projectId}/input/home`,
                icon: 'home'
              },
              {
                name: 'Calendar',
                routerLink: `../${projectId}/input/calendar`,
                icon: 'edit'
              }
            ]
          },
          {
            title: 'Reporting',
            collapsible: true,
            items: [
              {
                name: 'Home',
                routerLink: `../${projectId}/reporting/home`,
                icon: 'home'
              },
              {
                name: 'GeneralReporting',
                routerLink: `../${projectId}/reporting/general`,
                icon: 'clipboard'
              },
              {
                name: 'PivotTable',
                routerLink: `../${projectId}/reporting/pivot-table`,
                icon: 'grid'
              }
            ]
          }
        ]
      };
    });
  }

}
