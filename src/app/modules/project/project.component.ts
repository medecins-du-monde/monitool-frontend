import { Component, OnInit, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import { Sidenav } from 'src/app/models/interfaces/sidenav.model';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from 'src/app/models/classes/project.model';
import { User } from 'src/app/models/classes/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit, AfterViewChecked {

  public sidenav: Sidenav;
  project: Project;
  user: User;

  bigPage: boolean;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private projectService: ProjectService,
    private changeDetectorRef: ChangeDetectorRef,
  ) { }



  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const projectId = params.id;
      this.authService.currentUser.subscribe((user: User) => {
        this.user = user;
      });
      this.projectService.get(projectId).then((project: Project) => {
        this.projectService.inBigPage.subscribe(value => this.bigPage = value);
        this.project = project;
        //If the user has a data entry roles, only display the datasource they can modify
        if (this.user.role === 'input') {
          this.user.dataSources.forEach(dataSource => {
            input.items.push({
              name: this.projectService.getNamefromId(dataSource, this.project.forms),
              routerLink: `../${projectId}/input/inputs/${dataSource}`,
              icon: 'edit'
            });
          });
        } else {
          this.project.forms.forEach(form => {
            input.items.push(
              {
                name: form.name,
                routerLink: `../${projectId}/input/inputs/${form.id}`,
                icon: 'edit'
              }
            );
          });
        }
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

      if (this.user.role === 'owner' || this.user.role === 'admin') {
        this.sidenav = {
          groups: [
            structure,
            input,
            reporting
          ]
        };
      } else if (this.user.role === 'input') {
        this.sidenav = {
          groups: [
            input,
            reporting
          ]
        };
      } else {
        this.sidenav = {
          groups: [
            reporting
          ]
        };
      }
    });
  }

  ngAfterViewChecked(): void {
    this.changeDetectorRef.detectChanges();
  }

}
