import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../models/classes/user.model';
import {AuthService} from '../services/auth.service';
import { ProjectService } from '../services/project.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService  implements OnDestroy {

  user: User;

  private subscription: Subscription = new Subscription();

  constructor(private authService: AuthService, private route: Router, private projectService: ProjectService) {
    this.subscription.add(
      this.authService.currentUser.subscribe((user: User) => {
        this.user = user;
      })
    );
  }

  async canActivate(route: ActivatedRouteSnapshot): Promise<boolean>{
    if (route.paramMap.get('id')){
      this.projectService.updateProjectId(route.paramMap.get('id'));
    }
    if (await this.authService.isAuthenticated()){
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
      return true;
    }
    this.route.navigate(['login']);
    return false;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
