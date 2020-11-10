import { Component, OnInit } from '@angular/core';
import { MultiLanguage } from 'src/app/models/multi-language.model';
import { TranslateService } from '@ngx-translate/core';

export interface Task {
  taskText1: MultiLanguage;
  buttonText1: MultiLanguage;
  buttonIcon1: string;
  status: number;
  routerLink1: string;
  done: number;
  ongoing: number;
  missing: number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  displayedColumns: string[] = ['task', 'status'];
  dataSource: Task[];

  constructor(private translateService: TranslateService) { }

  get currentLang() {
    return this.translateService.currentLang ? this.translateService.currentLang : this.translateService.defaultLang;
  }

  ngOnInit(): void {
    this.dataSource = [
      {
        taskText1: new MultiLanguage({
          en: 'Fill the 119 forms of ',
          es: 'Rellenar los 119 formularios de ',
          fr: 'Remplir les 119 saisies de ',
        }),
        buttonIcon1: 'edit',
        buttonText1: new MultiLanguage({
          en: 'Extraction du SNIS (CSP)',
          es: 'Extraction du SNIS (CSP)',
          fr: 'Extraction du SNIS (CSP)',
        }),
        status: 100,
        routerLink1: `.`,
        done: 40,
        ongoing: 40,
        missing: 20,

      },
      {
        taskText1: new MultiLanguage({
          en: 'Fill the 119 forms of ',
          es: 'Rellenar los 119 formularios de ',
          fr: 'Remplir les 119 saisies de ',
        }),
        buttonIcon1: 'edit',
        buttonText1: new MultiLanguage({
          en: 'Registre pharmacie (CSP)',
          es: 'Registre pharmacie (CSP)',
          fr: 'Registre pharmacie (CSP)',
        }),
        status: 30,
        routerLink1: `.`,
        done: 40,
        ongoing: 40,
        missing: 20,
      },
      {
        taskText1: new MultiLanguage({
          en: 'Fill the 42 forms of ',
          es: 'Rellenar los 42 formularios de ',
          fr: 'Remplir les 42 saisies de ',
        }),
        buttonIcon1: 'edit',
        buttonText1: new MultiLanguage({
          en: 'Rapport de supervision trimestriel (CSP)',
          es: 'Rapport de supervision trimestriel (CSP)',
          fr: 'Rapport de supervision trimestriel (CSP)',
        }),
        status: 45,
        routerLink1: `.`,
        done: 40,
        ongoing: 40,
        missing: 20,
      },
      {
        taskText1: new MultiLanguage({
          en: 'Fill the 144 forms of ',
          es: 'Rellenar los 144 formularios de ',
          fr: 'Remplir les 144 saisies de ',
        }),
        buttonIcon1: 'edit',
        buttonText1: new MultiLanguage({
          en: 'Registre des VLG (CSP & Unité mobile)',
          es: 'Registre des VLG (CSP & Unité mobile)',
          fr: 'Registre des VLG (CSP & Unité mobile)',
        }),
        status: 0,
        routerLink1: `.`,
        done: 40,
        ongoing: 40,
        missing: 20,
      },
      {
        taskText1: new MultiLanguage({
          en: 'Fill the 36 forms of ',
          es: 'Rellenar los 36 formularios de ',
          fr: 'Remplir les 36 saisies de ',
        }),
        buttonIcon1: 'edit',
        buttonText1: new MultiLanguage({
          en: 'Extraction du SNIS (Hôpital de référence)',
          es: 'Extraction du SNIS (Hôpital de référence)',
          fr: 'Extraction du SNIS (Hôpital de référence)',
        }),
        status: 0,
        routerLink1: `.`,
        done: 40,
        ongoing: 40,
        missing: 20,
      },
      {
        taskText1: new MultiLanguage({
          en: 'Fill the 36 forms of ',
          es: 'Rellenar los 36 formularios de ',
          fr: 'Remplir les 36 saisies de ',
        }),
        buttonIcon1: 'edit',
        buttonText1: new MultiLanguage({
          en: 'Registre des VLG (Hôpital de référence)',
          es: 'Registre des VLG (Hôpital de référence)',
          fr: 'Registre des VLG (Hôpital de référence)',
        }),
        status: 0,
        routerLink1: `.`,
        done: 40,
        ongoing: 40,
        missing: 20,
      },
      {
        taskText1: new MultiLanguage({
          en: 'Fill the 126 forms of ',
          es: 'Rellenar los 126 formularios de ',
          fr: 'Remplir les 126 saisies de ',
        }),
        buttonIcon1: 'edit',
        buttonText1: new MultiLanguage({
          en: 'Recensement',
          es: 'Recensement',
          fr: 'Recensement',
        }),
        status: 0,
        routerLink1: `.`,
        done: 40,
        ongoing: 40,
        missing: 20,
      },
      {
        taskText1: new MultiLanguage({
          en: 'Fill the 6 forms of ',
          es: 'Rellenar los 6 formularios de ',
          fr: 'Remplir les 6 saisies de ',
        }),
        buttonIcon1: 'edit',
        buttonText1: new MultiLanguage({
          en: 'Coordination',
          es: 'Coordination',
          fr: 'Coordination',
        }),
        status: 0,
        routerLink1: `.`,
        done: 40,
        ongoing: 40,
        missing: 20,
      },
    ];
  }

}
