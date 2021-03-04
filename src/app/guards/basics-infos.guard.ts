import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { ProjectService } from 'src/app/services/project.service';


@Injectable({
  providedIn: 'root'
})
export class BasicsInfosGuard implements CanActivate {

  constructor(
    private projectService: ProjectService) {}

  canActivate(): boolean | Observable<boolean> {
    return this.projectService.basicInfos.value;
  }

}
