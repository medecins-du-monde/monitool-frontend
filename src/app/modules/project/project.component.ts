import { Component, OnInit, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
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
export class ProjectComponent implements OnInit, AfterViewChecked {

  public sidenav: Sidenav;
  project: Project;

  breadcrumbList: BreadcrumbItem[];

  bigPage: boolean;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private changeDetectorRef: ChangeDetectorRef,
  ) { }



  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const projectId = params.id;
      this.projectService.get(projectId).then((project: Project) => {
        this.projectService.inBigPage.subscribe(value => this.bigPage = value);
        this.projectService.project.next(project);
        this.project = project;
        this.project.forms.forEach(form => {
          input.items.push(
            {
              name: form.name,
              routerLink: `../${projectId}/input/inputs/${form.id}`,
              icon: 'edit',
              disable: false
            }
          );
        });
        this.breadcrumbList = this.projectService.breadcrumbList;
      });

      const structure = {
            title: 'Structure',
            collapsible: true,
            disable: false,
            items: [
              {
                name: 'Home',
                routerLink: `../${projectId}/structure/home`,
                icon: 'home',
                disable: false
              },
              {
                name: 'Basics',
                routerLink: `../${projectId}/structure/basics`,
                icon: 'database',
                disable: false
              },
              {
                name: 'CollectionSites',
                routerLink: `../${projectId}/structure/sites`,
                icon: 'location',
                disable: false
              },
              {
                name: 'DataSources',
                routerLink: `../${projectId}/structure/data-sources`,
                icon: 'folder',
                disable: false
              },
              {
                name: 'LogicalFrameworks',
                routerLink: `../${projectId}/structure/logical-frames`,
                icon: 'clipboard',
                disable: false
              },
              {
                name: 'CrossCuttingIndicators',
                routerLink: `../${projectId}/structure/cross-cutting`,
                icon: 'gauge',
                disable: false
              },
              {
                name: 'ExtraIndicators',
                routerLink: `../${projectId}/structure/extra-indicators`,
                icon: 'gauge',
                disable: false
              },
              {
                name: 'Users',
                routerLink: `../${projectId}/structure/users`,
                icon: 'people',
                disable: false
              },
              {
                name: 'History',
                routerLink: `../${projectId}/structure/history`,
                icon: 'history',
                disable: false
              }
            ]
      };
      const input = {
        title: 'Input',
        collapsible: true,
        disable: false,
        items: [
          {
            name: 'Home',
            routerLink: `../${projectId}/input/home`,
            icon: 'home',
            disable: false
          }
        ]
      };

      const reporting = {
        title: 'Reporting',
        collapsible: true,
        disable: false,
        items: [
          {
            name: 'Home',
            routerLink: `../${projectId}/reporting/home`,
            icon: 'home',
            disable: false
          },
          {
            name: 'GeneralReporting',
            routerLink: `../${projectId}/reporting/general`,
            icon: 'clipboard',
            disable: false
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

  ngAfterViewChecked(): void {
    this.changeDetectorRef.detectChanges();
  }

}
