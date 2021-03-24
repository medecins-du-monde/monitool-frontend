import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, ActivatedRoute } from '@angular/router';
import { User } from '../models/classes/user.model';
import { AuthService } from '../services/auth.service';
import { ProjectService } from '../services/project.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionsGuard implements CanActivate {
  user: User;
  userRole : string;
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
    this.projectService.hasProjectId.subscribe((id) => {
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

    //Redirect the user based on its role and the permission it gives them
    switch (module) {
      case 'structure':
        if (this.userRole === 'common' || (this.userRole === 'project' && !this.giveAccess)) {
          this.projectService.get(this.id).then(() => {
            this.router.navigate([`/projects/${this.id}/reporting/home`]);
          });
          return false;
        } else if (this.userRole === 'read' || this.userRole === 'input') {
          this.projectService.get(this.user.projectId).then(() => {
            this.router.navigate([`/projects/${this.user.projectId}/reporting/home`]);
          });
          return false;
        }
        return true;
      case 'input':
        // Get formID and make sure the user has the permission to access it
        const formId = route.children[0].params.formId;
        if (this.user.type === 'partner' && this.user.role === 'input') {
          this.user.dataSources.forEach(dataSource => {
            if (dataSource !== formId) {
              this.router.navigate([`/projects/${this.user.projectId}/reporting/home`]);
            }
          });
        }
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
        this.router.navigate(['/projects'])
        return false;
      case 'themes':
        if (this.userRole === 'admin') {
          return true;
        }
        this.router.navigate(['/projects'])
        return false;
      case 'indicators':
        if (this.userRole === 'admin') {
          return true;
        }
        this.router.navigate(['/projects'])
        return false;
    }
    return true;
  }
  
}
