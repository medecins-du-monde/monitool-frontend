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
            routerLink: '../structure/home',
            icon: 'home'
          },
          {
            name: 'Données de base',
            routerLink: '../structure/basics',
            icon: 'database'
          },
          {
            name: 'Lieux de collecte',
            routerLink: '../structure/sites',
            icon: 'location'
          },
          {
            name: 'Sources de données',
            routerLink: '../structure/data-source',
            icon: 'folder'
          },
          {
            name: 'Cadres logiques',
            routerLink: '../structure/logical-frame',
            icon: 'clipboard'
          },
          {
            name: 'Indicateurs transversaux',
            routerLink: '../structure/cross-cutting',
            icon: 'gauge'
          },
          {
            name: 'Indicateurs annexés',
            routerLink: '../structure/extra-indicators',
            icon: 'gauge'
          },
          {
            name: 'Utilisateurs',
            routerLink: '../structure/users',
            icon: 'people'
          },
          {
            name: 'Historique',
            routerLink: '../structure/history',
            icon: 'history'
          }
        ]
      },
      {
        title: 'Saisir',
        collapsible: true,
        items: [
          {
            name: 'Accueil',
            routerLink: '../input/home',
            icon: 'home'
          }
        ]
      },
      {
        title: 'Rapport',
        collapsible: true,
        items: [
          {
            name: 'Accueil',
            routerLink: '../reporting/home',
            icon: 'home'
          },
          {
            name: 'Rapport général',
            routerLink: '../reporting/general',
            icon: 'clipboard'
          },
          {
            name: 'Tableau croisé dynamique',
            routerLink: '../reporting/pivot-table',
            icon: 'grid'
          }
        ]
      }
    ]
  };

  constructor() { }

  ngOnInit(): void {
  }

}
