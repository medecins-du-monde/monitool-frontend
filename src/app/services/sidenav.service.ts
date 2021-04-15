import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Sidenav } from 'src/app/models/interfaces/sidenav.model';
import { Project } from '../models/classes/project.model';
import { User } from '../models/classes/user.model';
import { ProjectService } from 'src/app/services/project.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {

  sidenav: BehaviorSubject<Sidenav> = new BehaviorSubject({
    groups: []
  } as Sidenav);

  get sidenavData(): Observable<Sidenav> {
    return this.sidenav.asObservable();
  }

  constructor(
    private projectService: ProjectService,
  ) { }

  generateSidenav(user: User, project: Project ): void {
    let sidenavGenerated: Sidenav;
    let projectUser: User;

    const reporting = {
      title: 'Reporting',
      collapsible: true,
      items: [
        {
          name: 'Home',
          routerLink: `../${project.id}/reporting/home`,
          icon: 'home'
        },
        {
          name: 'GeneralReporting',
          routerLink: `../${project.id}/reporting/general`,
          icon: 'clipboard'
        },
      ]
    };

    const input = {
      title: 'Input',
      collapsible: true,
      items: [
        {
          name: 'Home',
          routerLink: `../${project.id}/input/home`,
          icon: 'home'
        }
      ]
    };

    const structure = {
      title: 'Structure',
      collapsible: true,
      items: [
        {
          name: 'Home',
          routerLink: `../${project.id}/structure/home`,
          icon: 'home'
        },
        {
          name: 'Basics',
          routerLink: `../${project.id}/structure/basics`,
          icon: 'database'
        },
        {
          name: 'CollectionSites',
          routerLink: `../${project.id}/structure/sites`,
          icon: 'location'
        },
        {
          name: 'DataSources',
          routerLink: `../${project.id}/structure/data-sources`,
          icon: 'folder'
        },
        {
          name: 'LogicalFrameworks',
          routerLink: `../${project.id}/structure/logical-frames`,
          icon: 'clipboard'
        },
        {
          name: 'CrossCuttingIndicators',
          routerLink: `../${project.id}/structure/cross-cutting`,
          icon: 'gauge'
        },
        {
          name: 'ExtraIndicators',
          routerLink: `../${project.id}/structure/extra-indicators`,
          icon: 'gauge'
        },
        {
          name: 'Users',
          routerLink: `../${project.id}/structure/users`,
          icon: 'people'
        },
        {
          name: 'History',
          routerLink: `../${project.id}/structure/history`,
          icon: 'history'
        }
      ]
    };

    if (user.type === 'user') {
       projectUser = project.users.filter(userProject => user.id === userProject['_id'])[0];
    }

    // If the user has a data entry roles, only display the datasource they can modify
    if (user.role === 'input') {
      user.dataSources.forEach(dataSource => {
        input.items.push({
          name: this.projectService.getNamefromId(dataSource, project.forms),
          routerLink: `../${project.id}/input/inputs/${dataSource}`,
          icon: 'edit'
        });
      });
    } else if (projectUser && projectUser.role === 'input') {
       projectUser.dataSources.forEach(dataSource => {
        input.items.push({
          name: dataSource.name,
          routerLink: `../${project.id}/input/inputs/${dataSource.id}`,
          icon: 'edit'
        });
      });
    }
    // Otherwise, we take all the datasources of the project
    else {
      project.forms.forEach(form => {
        input.items.push(
          {
            name: form.name,
            routerLink: `../${project.id}/input/inputs/${form.id}`,
            icon: 'edit'
          }
        );
      });
    }

    // Check if the user is part of the project and display the sidenav accordingly
    if (projectUser) {
      // If the user is owner, he can see all of the project
      if (projectUser.role === 'owner') {
        sidenavGenerated = {
          groups: [
            structure,
            input,
            reporting
          ]
        };
      }
      // If the user has just the input role
      // Then he can just access the input functionnalities and the report in the sidenav
      else if (projectUser.role === 'input') {
        sidenavGenerated = {
          groups: [
            input,
            reporting
          ]
        };
      }
      // If the user has a read only role, he can only access reporting
      else if (projectUser.role === 'read'){
        sidenavGenerated = {
          groups: [
            reporting
          ]
        };
      }
      // If the user does not have a particular role in a project, redirect according to their global roles
    } else {
      if (user.role === 'owner' || user.role === 'admin') {
        sidenavGenerated = {
          groups: [
            structure,
            input,
            reporting
          ]
        };
      }
      // If the user has just the input role
      // Then he can just access the input functionnalities and the report in the sidenav
      else if (user.role === 'input') {
        sidenavGenerated = {
          groups: [
            input,
            reporting
          ]
        };
      }
      // Otherwise, he can just access the general report.
      else if (user.role === 'read' || user.role === 'common' || user.role === 'project'){
        sidenavGenerated = {
          groups: [
            reporting
          ]
        };
      }
    }

  // When a user creates a project, make sure the sidenav displays all the information, even when the page reloads
    this.projectService.projectUserCreatingProject.subscribe(canCreateProject => {
    // If a user has a project role but the project doesnt have its basics infos, it means it's being created
    // The sidenav needs to be displayed accordingly
    this.projectService.hasBasicsInfos.subscribe(hasBasicsInfos => {
      if ((user.role === 'project' && canCreateProject) || (user.role === 'project' && !hasBasicsInfos) || user.role === 'admin') {
        sidenavGenerated = {
          groups: [
            structure,
            input,
            reporting
          ]
        };
      }
    });
    this.sidenav.next(sidenavGenerated);
  });
  }


}
