import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {AuthService} from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService, private route: Router) { }

  async canActivate(){
    if (await this.authService.isAuthenticated()){
      return true;
    }

    console.log('agora vai');
    console.log(this.route.url);
    console.log(this.route);

    this.route.navigate(['login']);

    return false;
  }
}
