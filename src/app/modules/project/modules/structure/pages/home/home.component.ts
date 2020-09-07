import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

export interface Task {
  taskText1: string;
  taskText2: string;
  buttonText1: string;
  buttonText2: string;
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
  dataSource: Task[];

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const projectId = params.id;
      this.dataSource = [
        {
          taskText1: 'Remplissez les ',
          buttonIcon1: 'database',
          buttonText1: 'Données de base',
          taskText2: ' de votre projet (pays, nom, thématiques, ...).',
          status: 100,
          buttonIcon2: '',
          buttonText2: '',
          routerLink1: `../basics`,
          routerLink2: '',
        },
        {
          taskText1: 'Renseignez les ',
          buttonIcon1: 'location',
          buttonText1: 'Lieux de collecte',
          taskText2: ' sur lesquels votre projet va travailler.',
          status: 30,
          buttonIcon2: '',
          buttonText2: '',
          routerLink1: `../sites`,
          routerLink2: '',
        },
        {
          taskText1: 'Renseignez le cadre logique de référence de votre projet dans ',
          buttonIcon1: 'clipboard',
          buttonText1: 'Cadres Logiques',
          taskText2: '',
          status: 45,
          buttonIcon2: '',
          buttonText2: '',
          routerLink1: `../logical-frame`,
          routerLink2: '',
        },
        {
          taskText1: 'Si vous disposez de fonds institutionnels et que d\'autres ',
          buttonIcon1: 'clipboard',
          buttonText1: 'Cadres Logiques',
          taskText2: ' vont être utilisés sur le même projet, renseignez les également.',
          status: 0,
          buttonIcon2: '',
          buttonText2: '',
          routerLink1: `../logical-frame`,
          routerLink2: '',
        },
        {
          taskText1: 'Si vous disposez d\'autres indicateurs que vous désirez suivre en dehors de votre (vos) cadre(s) logique(s), ajoutez les dans ',
          buttonIcon1: 'gauge',
          buttonText1: 'Indicateurs annexés',
          taskText2: '',
          status: 0,
          buttonIcon2: '',
          buttonText2: '',
          routerLink1: `../extra-indicators`,
          routerLink2: '',
        },
        {
          taskText1: 'Renseignez les ',
          buttonIcon1: 'folder',
          buttonText1: 'Sources de données',
          taskText2: ' dont vous allez extraire les données nécessaires au calculs des indicateurs de tous vos cadres logiques. À mesure de votre avancement, mettez à jour les formules de calcul de vos indicateurs dans ',
          status: 0,
          buttonIcon2: 'clipboard',
          buttonText2: 'Cadres Logiques',
          routerLink1: `../data-source`,
          routerLink2: '../extra-indicators',
        },
        {
          taskText1: 'Réalisez la même tâche pour les ',
          buttonIcon1: 'gauge',
          buttonText1: 'Indicateurs transversaux',
          taskText2: '',
          status: 0,
          buttonIcon2: '',
          buttonText2: '',
          routerLink1: `../cross-cutting`,
          routerLink2: '',
        },
        {
          taskText1: 'Réalisez la même tâche pour les ',
          buttonIcon1: 'gauge',
          buttonText1: 'Indicateurs annexés',
          taskText2: '',
          status: 0,
          buttonIcon2: '',
          buttonText2: '',
          routerLink1: `../extra-indicators`,
          routerLink2: '',
        },
      ];
    });
  }
}
