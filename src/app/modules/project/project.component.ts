import { Component, OnInit } from '@angular/core';
import { Sidenav } from 'src/app/models/sidenav.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  public sidenav: Sidenav;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const projectId = params.id;
      this.sidenav = {
        groups: [
          {
            title: 'Structure',
            collapsible: true,
            items: [
              {
                name: 'Accueil',
                routerLink: `../${projectId}/structure/home`,
                icon: 'home'
              },
              {
                name: 'Données de base',
                routerLink: `../${projectId}/structure/basics`,
                icon: 'database'
              },
              {
                name: 'Lieux de collecte',
                routerLink: `../${projectId}/structure/site`,
                icon: 'location'
              },
              {
                name: 'Sources de données',
                routerLink: `../${projectId}/structure/data-source`,
                icon: 'folder'
              },
              {
                name: 'Cadres logiques',
                routerLink: `../${projectId}/structure/logical-frame`,
                icon: 'clipboard'
              },
              {
                name: 'Indicateurs transversaux',
                routerLink: `../${projectId}/structure/cross-cutting`,
                icon: 'gauge'
              },
              {
                name: 'Indicateurs annexés',
                routerLink: `../${projectId}/structure/extra-indicators`,
                icon: 'gauge'
              },
              {
                name: 'Utilisateurs',
                routerLink: `../${projectId}/structure/users`,
                icon: 'people'
              },
              {
                name: 'Historique',
                routerLink: `../${projectId}/structure/history`,
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
                routerLink: `../${projectId}/input/home`,
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
                routerLink: `../${projectId}/reporting/home`,
                icon: 'home'
              },
              {
                name: 'Rapport général',
                routerLink: `../${projectId}/reporting/general`,
                icon: 'clipboard'
              },
              {
                name: 'Tableau croisé dynamique',
                routerLink: `../${projectId}/reporting/pivot-table`,
                icon: 'grid'
              }
            ]
          }
        ]
      };
    });
  }

}
