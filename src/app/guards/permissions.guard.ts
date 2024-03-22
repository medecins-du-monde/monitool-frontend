// tslint:disable: no-string-literal
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { Project } from '../models/classes/project.model';
import { User } from '../models/classes/user.model';
import { AuthService } from '../services/auth.service';
import { ProjectService } from '../services/project.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionsGuard implements CanActivate {
  currentProjectId: string;
  giveAccess: boolean;
  // This give the rights of the user in the whole application : Common, Project Creation or Admin.
  activeUser: User;
  // This give the rights of the user inside a project: Owner, Data entry, Read only.
  currentProjectUser: User;
  currentProject: Project;

  constructor(private authService: AuthService, private router: Router, private projectService: ProjectService) {

    combineLatest([this.projectService.openedProject, this.authService.currentUser]).pipe(
      map(results => ({ currentProject: results[0] as Project, currentUser: results[1] as User}))
    ).subscribe((res: {currentProject: Project, currentUser: User}) => {
      this.activeUser = res.currentUser;
      this.currentProjectUser = res.currentProject.users.find(user => {
        if ((res.currentUser['_id'] && user.id === res.currentUser['_id'])
             || (user.name === res.currentUser.name && user.username === res.currentUser.username)) {
          return true;
        }
        return false;
      });
      if (!this.currentProjectUser) {
        this.currentProjectUser = res.currentUser;
      }
    });

    // TODO: Check if really usefull
    // Make sure we have the correct project ID for MDM Accounts
    this.projectService.getProjectId.subscribe((id) => {
      this.currentProjectId = id;
    });
  }

  async canActivate(
    route: ActivatedRouteSnapshot): Promise<boolean>  {
    // Get the route path
    const module = route.routeConfig.path;
    
    await this.projectService.get(route.parent.params.id).then((project: Project) => { /** Guard is required to fetch the project before loading */ });

    // Redirect the user based on its role and the permission it gives them
    switch (module) {
      // For the structure part
      case 'structure':
        // No need to check the project role because as soon as a user create a project
        // he has the owner role on this project
        if ((this.currentProjectUser.role === 'admin' || this.currentProjectUser.role === 'owner')) {
          return true;
        }
        else {
          this.router.navigate([`/projects/${this.currentProjectId}/reporting/home`]);
          return false;
        }
      case 'input':
        // If the user has a partner account or has input role
        if (this.currentProjectUser.role === 'owner' || this.currentProjectUser.role === 'admin') {
          return true;
        }
        // Get formID of the current pageand make sure the user has the permission to access it
        // Otherwise redirect him to the reporting home page
        else if (this.currentProjectUser.role === 'input') {
          // If we have formId in the url but the user doesn't have access to this form
          // then he is redirected to the input home page
          if (route.children[0].params.formId
            && !this.currentProjectUser.dataSources.find(datasource => datasource.id === route.children[0].params.formId)) {
            this.router.navigate([`/projects/${this.currentProjectId}/input/home`]);
            return false;
          }
          else  {
            return true;
          }
        }
        else {
          this.router.navigate([`/projects/${this.currentProjectId}/reporting/home`]);
          return false;
        }
      case 'reporting':
        if (this.currentProjectUser.role === 'admin'
            || this.currentProjectUser.role === 'common'
            || this.currentProjectUser.role === 'owner'
            || this.currentProjectUser.role === 'input'
            || this.currentProjectUser.role === 'read'
            || this.currentProjectUser.role === 'project') {
              return true;
            }
        this.router.navigate(['/projects']);
        return false;
      case 'users':
        if (this.activeUser.role === 'admin') {
          return true;
        }
        this.router.navigate(['/projects']);
        return false;
      case 'themes':
        if (this.activeUser.role === 'admin') {
          return true;
        }
        this.router.navigate(['/projects']);
        return false;
      case 'indicators':
        if (this.activeUser.role === 'admin') {
          return true;
        }
        this.router.navigate(['/projects']);
        return false;
    }
    return true;
  }

}
