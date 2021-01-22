import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { ProjectService } from '../services/project.service';

export interface ComponentCanDeactivate {
  canDeactivate: () => boolean | Observable<boolean>;
}

@Injectable({
  providedIn: 'root'
})
export class PendingChangesGuard implements CanDeactivate<ComponentCanDeactivate> {

  constructor(private projectService: ProjectService){}

  // should return true when the page is allowed to close itself and false in the other case
  canDeactivate(component: ComponentCanDeactivate): boolean | Observable<boolean> {
    // if we receive a component, we use its specific rule
    if (component !== null){
      return component.canDeactivate() ?
        true : 
        confirm('You made changes. Click OK to confirm that you want to leave without saving.');
    }

    // if we have pending changes in the project we ask the user if he really wants to close the page
    if (this.projectService.hasPendingChanges) {
      if (confirm('You made changes. Click OK to confirm that you want to leave without saving.')){
        // if the user confirm, we discard the changes
        this.projectService.discardPendingChanges();
        return true;
      } else {
        // we return false and the navigating doesn't occur
        return false;
      }
    }
    else {
      return true;
    }
  }
}
