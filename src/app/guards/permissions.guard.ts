// tslint:disable: no-string-literal
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { User } from '../models/classes/user.model';
import { AuthService } from '../services/auth.service';
import { ProjectService } from '../services/project.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionsGuard implements CanActivate {
  user: User;
  userRole: string;
  userType: string;
  id: string;
  giveAccess: boolean;

  constructor(private authService: AuthService, private router: Router, private projectService: ProjectService) {
    this.authService.currentUser.subscribe((user: User) => {
      this.user = user;
      this.userRole = user.role;
      this.userType = user.type;
    });
    // Make sure we have the correct project ID for MDM Accounts
    this.projectService.getProjectId.subscribe((id) => {
      this.id = id;
    });
    // Allow project role to go to structure when they create a project
    this.projectService.projectUserCreatingProject.subscribe(val => {
       this.giveAccess = val;
    });
  }

  async canActivate(
    route: ActivatedRouteSnapshot): Promise<boolean>  {
    // Get the route path
    const module = route.routeConfig.path;

    // Redirect the user based on its role and the permission it gives them
    switch (module) {
      // For the structure part
      case 'structure':
        if (this.userType === 'user' && !this.giveAccess && this.id !== '') {
          // MDM accounts can have assigned role within the project that is different than their MDM account role
          this.projectService.get(this.id).then((project) => {
            // Get the project and check if the user is part of it
            const projectUser = project.users.filter(user => user.id === this.user['_id']);
            // If the MDM user is owner in a particular project, he can access everything
            if (projectUser.length > 0 && projectUser[0].role === 'owner') {
              return true;
              // If the MDM user is not owner of the project, redirect them
            } else if ((this.userRole === 'common') || (this.userRole === 'project' && !this.giveAccess)
                      || (projectUser.length > 0 && projectUser[0].role === 'input')
                      || (projectUser.length > 0 && projectUser[0].role === 'read')) {
              // Not authorized and redirection to the reporting home page
              this.projectService.get(this.id).then(() => {
                this.router.navigate([`/projects/${this.id}/reporting/home`]);
              });
              return false;
            }
          });
        } else if (this.userType === 'user' && this.userRole === 'project' && this.giveAccess) {
          return true;
        }
        // It the user has read role or input role
        else if ((this.userRole === 'read' || this.userRole === 'input') && this.user.projectId !== '') {
          // Not authorized and redirection to reporting home
          this.projectService.get(this.user.projectId).then(() => {
            this.router.navigate([`/projects/${this.user.projectId}/reporting/home`]);
          });
          return false;
        }
        // Otherwise, he has access to all the structure
        return true;
      case 'input':
        // If the user has a partner account or has input role
        if (this.user.type === 'partner' && this.user.role === 'input') {
            // Get formID of the current pageand make sure the user has the permission to access it
            // Otherwise redirect him to the reporting home page
          if (!this.user.dataSources.includes(route.children[0].params.formId)) {
            this.router.navigate([`/projects/${this.user.projectId}/reporting/home`]);
          }
          return true;
        } else if (this.userType === 'user' && this.id !== '') {
          this.projectService.get(this.id).then((project) => {
            // Check if the user is part of this project
            const projectUser = project.users.filter(user => user.id === this.user['_id']);
            if (projectUser.length > 0 && projectUser[0].role === 'input') {
              // If he does and has an input role, check which datasource he has access to and redirect accordingly
              const hasAccessToDatasource = project.forms.some(form => form.id === route.children[0].params.formId);
              if (!hasAccessToDatasource) {
                this.router.navigate([`/projects/${this.id}/reporting/home`]);
              }
              return true;
            }
          });
        }
        // If the user has just a read_only role
        // Redirect him to the reporting home page
        if (this.userRole === 'read'){
          this.router.navigate([`/projects/${this.user.projectId}/reporting/home`]);
        }
        break;
      case 'reporting':
        return true;
      case 'users':
        if (this.userRole === 'admin') {
          return true;
        }
        this.router.navigate(['/projects']);
        return false;
      case 'themes':
        if (this.userRole === 'admin') {
          return true;
        }
        this.router.navigate(['/projects']);
        return false;
      case 'indicators':
        if (this.userRole === 'admin') {
          return true;
        }
        this.router.navigate(['/projects']);
        return false;
    }
    return true;
  }

}
