import { Component, OnInit } from '@angular/core';
import { Sidenav } from 'src/app/models/sidenav.model';

@Component({
  selector: 'app-parameters',
  templateUrl: './parameters.component.html',
  styleUrls: ['./parameters.component.scss']
})
export class ParametersComponent implements OnInit {

  public sidenav: Sidenav = {
    groups: [
      {
        title: 'Paramètres',
        collapsible: false,
        items: [
          {
            name: 'Utilisateurs',
            routerLink: '/parameters/users',
            icon: 'people'
          },
          {
            name: 'Thématiques',
            routerLink: '/parameters/themes',
            icon: 'clipboard'
          },
          {
            name: 'Indicateurs traversaux',
            routerLink: '/parameters/indicators',
            icon: 'gauge'
          }
        ]
      }
    ]
  };

  constructor() { }

  ngOnInit(): void {
  }

}
