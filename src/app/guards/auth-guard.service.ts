import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
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

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean>{
    if (await this.authService.isAuthenticated()){
      if (this.user.type === 'partner'){
        if (state.url.substring(0, 9) === '/projects'){
          this.route.navigate([`/project/${this.user.projectId}`]);
        }
        if (state.url.substring(0, 11) === '/parameters' || state.url.substring(0, 11) === '/indicators'){
         this.route.navigate(['/home']);
        }
      }
      return true;
    }

    this.route.navigate(['login']);

    return false;
  }
}
