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
        // If the user has common role or project role without access to this one.
        if ((this.userRole === 'common') || (this.userRole === 'project' && !this.giveAccess)) {
          // Not authorized and redirection to the reporting home page
          this.projectService.get(this.id).then(() => {
            this.router.navigate([`/projects/${this.id}/reporting/home`]);
          });
          return false;
        }
        // It the user has read role or input role
        else if (this.userRole === 'read' || this.userRole === 'input') {
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
          this.user.dataSources.forEach(dataSource => {
            // Get formID of the current pageand make sure the user has the permission to access it
            // Otherwise redirect him to the reporting home page
            if (dataSource !== route.children[0].params.formId) {
              this.router.navigate([`/projects/${this.user.projectId}/reporting/home`]);
            }
          });
        }
        // If the user has just a read_only role
        // Redirect him to the reporting home page
        if (this.userRole === 'read'){
          this.router.navigate([`/projects/${this.user.projectId}/reporting/home`]);
        }
        return true;
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
