import { Component, OnInit } from '@angular/core';

export interface PeriodicElement {
  taskText1: string;
  taskText2: string;
  buttonText1: string;
  buttonText2: string;
  buttonIcon1: string;
  buttonIcon2: string;
  status: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    taskText1: 'Remplissez les ',
    buttonIcon1: 'database',
    buttonText1: 'Données de base',
    taskText2: ' de votre projet (pays, nom, thématiques, ...).',
    status: 100,
    buttonIcon2: '',
    buttonText2: ''
  },
  {
    taskText1: 'Renseignez les ',
    buttonIcon1: 'location',
    buttonText1: 'Lieux de collecte',
    taskText2: ' sur lesquels votre projet va travailler.',
    status: 30,
    buttonIcon2: '',
    buttonText2: ''
  },
  {
    taskText1: 'Renseignez le cadre logique de référence de votre projet dans ',
    buttonIcon1: 'clipboard',
    buttonText1: 'Cadres Logiques',
    taskText2: '',
    status: 45,
    buttonIcon2: '',
    buttonText2: ''
  },
  {
    taskText1: 'Si vous disposez de fonds institutionnels et que d\'autres ',
    buttonIcon1: 'clipboard',
    buttonText1: 'Cadres Logiques',
    taskText2: 'vont être utilisés sur le même projet, renseignez les également.',
    status: 0,
    buttonIcon2: '',
    buttonText2: ''
  },
  {
    taskText1: 'Si vous disposez d\'autres indicateurs que vous désirez suivre en dehors de votre (vos) cadre(s) logique(s), ajoutez les dans ',
    buttonIcon1: 'gauge',
    buttonText1: 'Indicateurs annexés',
    taskText2: '',
    status: 0,
    buttonIcon2: '',
    buttonText2: ''
  },
  {
    taskText1: 'Renseignez les ',
    buttonIcon1: 'folder',
    buttonText1: 'Sources de données',
    taskText2: 'dont vous allez extraire les données nécessaires au calculs des indicateurs de tous vos cadres logiques. À mesure de votre avancement, mettez à jour les formules de calcul de vos indicateurs dans',
    status: 0,
    buttonIcon2: 'clipboard',
    buttonText2: 'Cadres Logiques'
  },
  {
    taskText1: 'Réalisez la même tâche pour les ',
    buttonIcon1: 'gauge',
    buttonText1: 'Indicateurs transversaux',
    taskText2: '',
    status: 0,
    buttonIcon2: '',
    buttonText2: ''
  },
  {
    taskText1: 'Réalisez la même tâche pour les ',
    buttonIcon1: 'gauge',
    buttonText1: 'Indicateurs annexés',
    taskText2: '',
    status: 0,
    buttonIcon2: '',
    buttonText2: ''
  },
];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  displayedColumns: string[] = ['task', 'status'];
  dataSource = ELEMENT_DATA;

  color = 'accent';

  constructor() { }

  ngOnInit(): void {
  }

}
