import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, ActivatedRoute } from '@angular/router';
import { User } from '../models/classes/user.model';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionsGuard implements CanActivate {
  user: User;
  userRole : string;
  userType: string;

  constructor(private authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.authService.currentUser.subscribe((user: User) => {
      this.user = user;
      this.userRole = user.role;
      this.userType = user.type;
    });
  }

  canActivate(
    route: ActivatedRouteSnapshot): boolean  {
    // Get the route path
    const module = route.routeConfig.path;

    //Redirect the user based on its role and the permission it gives them
    switch (module) {
      case 'structure': 
        if (this.userRole === 'owner' || this.userRole === 'admin') {
          return true;
        }
        this.router.navigate([`/projects/${this.user.projectId}/reporting/home`]);
        return false;
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
    }
    return true;
  }
  
}
