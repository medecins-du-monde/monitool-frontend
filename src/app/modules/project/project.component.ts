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
            icon: 'home'
          },
          {
            name: 'Données de base',
            routerLink: '',
            icon: 'database'
          },
          {
            name: 'Lieux de collecte',
            routerLink: '',
            icon: 'location'
          },
          {
            name: 'Sources de données',
            routerLink: '',
            icon: 'folder'
          },
          {
            name: 'Cadres logiques',
            routerLink: '',
            icon: 'clipboard'
          },
          {
            name: 'Indicateurs transversaux',
            routerLink: '',
            icon: 'gauge'
          },
          {
            name: 'Indicateurs annexés',
            routerLink: '',
            icon: 'gauge'
          },
          {
            name: 'Utilisateurs',
            routerLink: '',
            icon: 'people'
          },
          {
            name: 'Historique',
            routerLink: '',
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
            routerLink: '',
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
            routerLink: '',
            icon: 'home'
          },
          {
            name: 'Rapport général',
            routerLink: '',
            icon: 'clipboard'
          },
          {
            name: 'Tableau croisé dynamique',
            routerLink: '',
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
