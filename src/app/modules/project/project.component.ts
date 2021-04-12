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
  projectUser = [];

  bigPage: boolean;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private projectService: ProjectService,
    private changeDetectorRef: ChangeDetectorRef,
  ) { }



  ngOnInit(): void {
    this.projectUser = [];
    this.sidenav = {
      groups: []
    };
    this.route.params.subscribe(params => {
      const projectId = params.id;
      this.authService.currentUser.subscribe((user: User) => {
        this.user = user;
      });
      this.projectService.get(projectId).then((project: Project) => {
        this.projectService.inBigPage.subscribe(value => this.bigPage = value);
        this.project = project;
        if (this.user.type === 'user') {
          this.projectUser = project.users.filter(user => user.id === this.user['_id']);
        }
        // If the user has a data entry roles, only display the datasource they can modify
        if (this.user.role === 'input') {
          this.user.dataSources.forEach(dataSource => {
            input.items.push({
              name: this.projectService.getNamefromId(dataSource, this.project.forms),
              routerLink: `../${projectId}/input/inputs/${dataSource}`,
              icon: 'edit'
            });
          });
        } else if (this.projectUser && this.projectUser.length > 0 && this.projectUser[0].role === 'input') {
          this.projectUser[0].dataSources.forEach(dataSource => {
            input.items.push({
              name: dataSource.name,
              routerLink: `../${projectId}/input/inputs/${dataSource.id}`,
              icon: 'edit'
            });
          })
        }
        // Otherwise, we take all the datasources of the project
        else {
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

        // Check if the user is part of the project and display the sidenav accordingly
        if (this.projectUser && this.projectUser.length > 0) {
          // If the user is owner, he can see all of the project
          if (this.projectUser[0].role === 'owner') {
            this.sidenav = {
              groups: [
                structure,
                input,
                reporting
              ]
            };
          }
          // If the user has just the input role
          // Then he can just access the input functionnalities and the report in the sidenav
          else if (this.projectUser[0].role === 'input') {
            this.sidenav = {
              groups: [
                input,
                reporting
              ]
            };
          }
          // If the user has a read only role, he can only access reporting
          else if (this.projectUser[0].role === 'read'){
            this.sidenav = {
              groups: [
                reporting
              ]
            };
          }
          // If the user does not have a particular role in a project, redirect according to their global roles
        } else {
          if (this.user.role === 'owner' || this.user.role === 'admin') {
            this.sidenav = {
              groups: [
                structure,
                input,
                reporting
              ]
            };
          }
          // If the user has just the input role
          // Then he can just access the input functionnalities and the report in the sidenav
          else if (this.user.role === 'input') {
            this.sidenav = {
              groups: [
                input,
                reporting
              ]
            };
          }
          // Otherwise, he can just access the general report.
          else if (this.user.role === 'read' || this.user.role === 'common' || this.user.role === 'project'){
            this.sidenav = {
              groups: [
                reporting
              ]
            };
          }
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
      // When a user creates a project, make sure the sidenav displays all the information, even when the page reloads
      this.projectService.projectUserCreatingProject.subscribe(canCreateProject => {
        // If a user has a project role but the project doesnt have its basics infos, it means it's being created
        // The sidenav needs to be displayed accordingly
        this.projectService.hasBasicsInfos.subscribe(hasBasicsInfos => {
          if ((this.user.role === 'project' && canCreateProject) || (this.user.role === 'project' && !hasBasicsInfos) || this.user.role === 'admin') {
            this.sidenav = {
              groups: [
                structure,
                input,
                reporting
              ]
            };
          }
        });
      });
    });
  }

  ngAfterViewChecked(): void {
    this.changeDetectorRef.detectChanges();
  }

}
