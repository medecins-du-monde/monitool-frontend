import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';


@Injectable({
  providedIn: 'root'
})
export class BasicsInfosGuard implements CanActivate {

  constructor(
    private projectService: ProjectService,
    private route: Router) {}

  canActivate(): boolean {
    if (!this.projectService.basicInfos.value) {
      this.route.navigate([`projects/${this.projectService.project.value.id}/structure/basics`]);
      return false;
    }
    return true;
  }

}
