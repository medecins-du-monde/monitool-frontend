import { Component, OnInit } from '@angular/core';
import { Sidenav } from 'src/app/models/sidenav.model';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  public sidenav: Sidenav = {
    groups: [
      {
        title: 'Structure',
        collapsible: true,
        items: [
          {
            name: 'Accueil',
            routerLink: '',
            icon: 'assets/icons/people.svg'
          },
          {
            name: 'Données de base',
            routerLink: '',
            icon: 'assets/icons/clipboard.svg'
          },
          {
            name: 'Lieux de collecte',
            routerLink: '',
            icon: 'assets/icons/gauge.svg'
          },
          {
            name: 'Lieux de collecte',
            routerLink: '',
            icon: 'assets/icons/gauge.svg'
          },
          {
            name: 'Cadres logiques',
            routerLink: '',
            icon: 'assets/icons/gauge.svg'
          },
          {
            name: 'Indicateurs transversaux',
            routerLink: '',
            icon: 'assets/icons/gauge.svg'
          },
          {
            name: 'Indicateurs annexés',
            routerLink: '',
            icon: 'assets/icons/gauge.svg'
          },
          {
            name: 'Utilisateurs',
            routerLink: '',
            icon: 'assets/icons/gauge.svg'
          },
          {
            name: 'Historique',
            routerLink: '',
            icon: 'assets/icons/gauge.svg'
          }
        ]
      },
      {
        title: 'Saisir',
        collapsible: true,
        items: [
          {
            name: 'Accueil',
            routerLink: '',
            icon: 'assets/icons/people.svg'
          }
        ]
      },
      {
        title: 'Rapport',
        collapsible: true,
        items: [
          {
            name: 'Accueil',
            routerLink: '',
            icon: 'assets/icons/people.svg'
          },
          {
            name: 'Rapport général',
            routerLink: '',
            icon: 'assets/icons/people.svg'
          },
          {
            name: 'Tableau croisé dynamique',
            routerLink: '',
            icon: 'assets/icons/grid.svg'
          }
        ]
      }
    ]
  };

  constructor() { }

  ngOnInit(): void {
  }

}
