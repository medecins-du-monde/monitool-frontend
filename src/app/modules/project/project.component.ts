import { Component, OnInit } from '@angular/core';
import { Sidenav } from 'src/app/models/interfaces/sidenav.model';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from 'src/app/models/classes/project.model';
import BreadcrumbItem from 'src/app/models/interfaces/breadcrumb-item.model';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  public sidenav: Sidenav;
  project: Project;

  breadcrumbList: BreadcrumbItem[];

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
  ) { }



  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const projectId = params.id;
      this.projectService.get(projectId).then((project: Project) => {
        this.projectService.project.next(project);
        this.project = project;
        this.project.forms.forEach(form => {
          input.items.push(
            {
              name: form.name,
              routerLink: `../${projectId}/input/inputs/${form.id}`,
              icon: 'edit'
            }
          );
        });

        this.breadcrumbList = [
          {
            value: 'Projects',
            link: './../../projects'
          } as BreadcrumbItem,
          {
            value: this.project.country,
          } as BreadcrumbItem,
          {
            value: this.project.name,
          } as BreadcrumbItem,
        ];

      });

      const structure = {
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
                routerLink: `../${projectId}/structure/logical-frames`,
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
      };
      const input = {
        title: 'Input',
        collapsible: true,
        items: [
          {
            name: 'Home',
            routerLink: `../${projectId}/input/home`,
            icon: 'home'
          }
        ]
      };

      const reporting = {
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
        ]
      };

      this.sidenav = {
        groups: [
          structure,
          input,
          reporting
        ]
      };
    });
  }

}
