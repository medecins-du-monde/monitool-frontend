import { Injectable } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { MultiLanguage } from '../models/classes/multi-language.model';
import { ProjectService } from '../services/project.service';

export interface ComponentCanDeactivate {
  canDeactivate: () => boolean | Observable<boolean>;
}

@Injectable({
  providedIn: 'root'
})
export class PendingChangesGuard  {

  constructor(private projectService: ProjectService, private translateService: TranslateService){}

  get currentLang(): string {
    return this.translateService.currentLang ? this.translateService.currentLang : this.translateService.defaultLang;
  }

  warnMessage: MultiLanguage = new MultiLanguage({
    en: 'You made changes. Click OK to confirm that you want to leave without saving.',
    fr: 'Vous avez realisé des changements. Êtes-vous sûr de vouloir quitter sans sauvegarder?',
    es: 'Ha realizado cambios. ¿Esta seguro de querer cambiar de página sin guardar?'
  });

  // should return true when the page is allowed to close itself and false in the other case
  canDeactivate(component: ComponentCanDeactivate): boolean | Observable<boolean> {
    // if we receive a component, we use his specific rule
    if (component !== null) {
      if (component.canDeactivate()) {
        return true;
      } else {
        const deactivate = confirm(this.warnMessage[this.currentLang]);
        if (deactivate) {
          this.projectService.discardPendingChanges();
        }
        return deactivate;
      }
    }

    // if we have pending changes in the project we ask the user if he really wants to close the page
    if (this.projectService.hasPendingChanges) {
      if (confirm(this.warnMessage[this.currentLang])){
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
