import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { User } from '../models/classes/user.model';
import {AuthService} from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  user: User;

  constructor(private authService: AuthService, private route: Router) {
    this.authService.currentUser.subscribe((user: User) => {
      this.user = user;
    });
  }

  async canActivate(route: ActivatedRouteSnapshot): Promise<boolean>{
    if (await this.authService.isAuthenticated()){
      console.log('3', route);
      if (route.data.roles) {
        if (this.authService.isAuthorised(route.data.roles)) {
          return true;
        }
        else {
          if (route.routeConfig.path === 'projects'){
            this.route.navigate([`/projects/${this.user.projectId}`]);
          }
          else {
            this.route.navigate(['/home']);
          }
        }
      }
      console.log('return true');
      return true;
    }
    this.route.navigate(['login']);
    return false;
  }
}
