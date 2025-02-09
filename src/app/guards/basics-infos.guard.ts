import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';


@Injectable({
  providedIn: 'root'
})
export class BasicsInfosGuard  {

  constructor(
    private projectService: ProjectService,
    private route: Router) {}

  canActivate(): boolean {
    if (!this.projectService.basicInfos.value) {
      // It may be because no project have been loaded for the moment so we check that as well
      const projectId = window.location.href.split('/')[4];
      // TODO: Do it in a way that we don't need to load again the project
      this.projectService.get(projectId).then(() => {
        if (!this.projectService.basicInfos.value)
        {
          this.route.navigate([`projects/${projectId}/structure/basics`]);
          return false;
        }
      });
      return true;
    }
    return true;
  }

}
