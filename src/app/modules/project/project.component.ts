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
            icon: 'people'
          },
          {
            name: 'Données de base',
            routerLink: '',
            icon: 'clipboard'
          },
          {
            name: 'Lieux de collecte',
            routerLink: '',
            icon: 'gauge'
          },
          {
            name: 'Lieux de collecte',
            routerLink: '',
            icon: 'gauge'
          },
          {
            name: 'Cadres logiques',
            routerLink: '',
            icon: 'gauge'
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
            icon: 'gauge'
          },
          {
            name: 'Historique',
            routerLink: '',
            icon: 'gauge'
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
            icon: 'people'
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
            icon: 'people'
          },
          {
            name: 'Rapport général',
            routerLink: '',
            icon: 'people'
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
