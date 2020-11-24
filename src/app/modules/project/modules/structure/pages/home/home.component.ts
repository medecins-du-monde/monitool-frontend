import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project.model';
import { ProjectService } from 'src/app/services/project.service';
import { TranslateService } from '@ngx-translate/core';
import { MultiLanguage } from 'src/app/models/multi-language.model';


export interface Task {
  taskText1: MultiLanguage;
  taskText2: MultiLanguage;
  buttonText1: MultiLanguage;
  buttonText2: MultiLanguage;
  buttonIcon1: string;
  buttonIcon2: string;
  status: number;
  routerLink1: string;
  routerLink2: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  displayedColumns: string[] = ['task', 'status'];
  historyLink = '';

  dataSource: Task[];

  constructor(
    private projectService: ProjectService,
    private translateService: TranslateService
  ) { }

  get currentLang() {
    return this.translateService.currentLang ? this.translateService.currentLang : this.translateService.defaultLang;
  }

  ngOnInit(): void {
    this.projectService.openedProject.subscribe((project: Project) => {
      const projectId = project.id;
      this.historyLink = '/project/' + projectId + '/structure/history';
      const percentages = project.percentages;
      this.dataSource = [
        {
          taskText1: new MultiLanguage({
            en: 'Fill up the ',
            es: 'Rellene los ',
            fr: 'Remplissez les ',
          }),
          buttonIcon1: 'database',
          buttonText1: new MultiLanguage({
            en: 'Basics',
            es: 'Datos de base',
            fr: 'Données de base',
          }),
          taskText2: new MultiLanguage({
            en: ' de su proyecto (país, nombre, temáticas, ...).	',
            es: ' de su proyecto (país, nombre, temáticas, ...).	',
            fr: ' de votre projet (pays, nom, thématiques, ...).',
          }),
          status: percentages.basics,
          buttonIcon2: '',
          buttonText2:  new MultiLanguage(),
          routerLink1: `/project/${projectId}/structure/basics`,
          routerLink2: '',
        },
        {
          taskText1: new MultiLanguage({
            en: 'Fill up the list of ',
            es: 'Rellene la lista de ',
            fr: 'Renseignez les ',
          }),
          buttonIcon1: 'location',
          buttonText1: new MultiLanguage({
            en: 'Collection sites',
            es: 'Lugares de colecta',
            fr: 'Lieux de collecte',
          }),
          taskText2: new MultiLanguage({
            en: ' on which your project will collect data.',
            es: ' en los que su proyecto trabaja.',
            fr: ' sur lesquels votre projet va travailler.',
          }),
          status: percentages.sites,
          buttonIcon2: '',
          buttonText2: new MultiLanguage(),
          routerLink1: `/project/${projectId}/structure/sites`,
          routerLink2: '',
        },
        {
          taskText1: new MultiLanguage({
            en: 'Fill up the logical framework of your reference project in ',
            es: 'Rellene el marco lógico de su proyecto de referencia en ',
            fr: 'Renseignez le cadre logique de référence de votre projet dans ',
          }),
          buttonIcon1: 'clipboard',
          buttonText1: new MultiLanguage({
            en: 'Logical frameworks',
            es: 'Marcos lógicos',
            fr: 'Cadres logiques',
          }),
          taskText2: new MultiLanguage(),
          status: percentages.logicalFrames,
          buttonIcon2: '',
          buttonText2: new MultiLanguage(),
          routerLink1: `/project/${projectId}/structure/logical-frames`,
          routerLink2: '',
        },
        {
          taskText1: new MultiLanguage({
            en: 'If your project is founded by institutional donors and you need to track other ',
            es: 'Si su proyecto esta financiado por fondos institucionales y que otros ',
            fr: 'Si vous disposez de fonds institutionnels et que d\'autres ',
          }),
          buttonIcon1: 'clipboard',
          buttonText1: new MultiLanguage({
            en: 'Logical frameworks',
            es: 'Marcos lógicos',
            fr: 'Cadres logiques',
          }),
          taskText2: new MultiLanguage({
            en: ' fill them up as well.',
            es: ' seran usados en el mismo proyecto, agréguelos los tambien.',
            fr: ' vont être utilisés sur le même projet, renseignez les également.',
          }),
          status: percentages.logicalFramesOther,
          buttonIcon2: '',
          buttonText2: new MultiLanguage(),
          routerLink1: `/project/${projectId}/structure/logical-frames`,
          routerLink2: '',
        },
        {
          taskText1: new MultiLanguage({
            en: 'If you wish to track other indicators than those that are provided by your logical framework(s), add them in ',
            es: 'Si tiene otros indicadores que desea rastrear fuera de su(s) marco(s) lógico(s), agréguelos en ',
            fr: 'Si vous disposez d\'autres indicateurs que vous désirez suivre en dehors de votre (vos) cadre(s) logique(s), ajoutez les dans ',
          }),
          buttonIcon1: 'gauge',
          buttonText1: new MultiLanguage({
            en: 'Extra indicators',
            es: 'Indicadores adicionales',
            fr: 'Indicateurs annexés',
          }),
          taskText2: new MultiLanguage(),
          status: percentages.extraIndicators,
          buttonIcon2: '',
          buttonText2: new MultiLanguage(),
          routerLink1: `/project/${projectId}/structure/extra-indicators`,
          routerLink2: '',
        },
        {
          taskText1: new MultiLanguage({
            en: 'Fill up the ',
            es: 'Complete los ',
            fr: 'Renseignez les ',
          }),
          buttonIcon1: 'folder',
          buttonText1: new MultiLanguage({
            en: 'Data sources',
            es: 'Fuentes de datos',
            fr: 'Sources de données',
          }),
          taskText2: new MultiLanguage({
            en: ' from which you plan to extract the data that will be necesary to compute your indicators. As you progress, update the formulas for calculating your indicators in ',
            es: ' de donde extraerá los datos necesarios para calcular los indicadores de todos sus marcos lógicos. A medida que avance, actualice las fórmulas para calcular sus indicadores en ',
            fr: ' dont vous allez extraire les données nécessaires au calculs des indicateurs de tous vos cadres logiques. À mesure de votre avancement, mettez à jour les formules de calcul de vos indicateurs dans ',
          }),
          status: percentages.logicalFramesUpdate,
          buttonIcon2: 'clipboard',
          buttonText2: new MultiLanguage({
            en: 'Logical frameworks',
            es: 'Marcos lógicos',
            fr: 'Cadres logiques',
          }),
          routerLink1: `/project/${projectId}/structure/data-sources`,
          routerLink2: '/project/${projectId}/structure/extra-indicators',
        },
        {
          taskText1: new MultiLanguage({
            en: 'Perform the same task for ',
            es: 'Realice la misma tarea para ',
            fr: 'Réalisez la même tâche pour les ',
          }),
          buttonIcon1: 'gauge',
          buttonText1: new MultiLanguage({
            en: 'Cross-cutting indicators',
            es: 'Indicadores transversales',
            fr: 'Indicateurs transversaux',
          }),
          taskText2: new MultiLanguage(),
          status: percentages.crossCuttingUpdate,
          buttonIcon2: '',
          buttonText2: new MultiLanguage(),
          routerLink1: `/project/${projectId}/structure/cross-cutting`,
          routerLink2: '',
        },
        {
          taskText1: new MultiLanguage({
            en: 'Perform the same task for ',
            es: 'Realice la misma tarea para ',
            fr: 'Réalisez la même tâche pour les ',
          }),
          buttonIcon1: 'gauge',
          buttonText1: new MultiLanguage({
            en: 'Extra indicators',
            es: 'Indicadores adicionales',
            fr: 'Indicateurs annexés',
          }),
          taskText2: new MultiLanguage(),
          status: percentages.extraIndicatorsUpdate,
          buttonIcon2: '',
          buttonText2: new MultiLanguage(),
          routerLink1: `/project/${projectId}/structure/extra-indicators`,
          routerLink2: '',
        },
      ];
    });
  }
}
