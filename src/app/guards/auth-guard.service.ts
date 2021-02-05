import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { User } from '../models/classes/user.model';
import {AuthService} from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  user: User

  constructor(private authService: AuthService, private route: Router) {
    this.authService.currentUser.subscribe((user: User) => {
      this.user = user;
    })
  }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean>{
    if (await this.authService.isAuthenticated()){
      console.log(state.url);
      if (state.url === '/projects'){
        if (this.user.type === 'partner'){
          console.log(this.user);
          this.route.navigate([`/project/${this.user.projectId}`])
        }
      }
      return true;
    }

    this.route.navigate(['login']);

    return false;
  }
}
