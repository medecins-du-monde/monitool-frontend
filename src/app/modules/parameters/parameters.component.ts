import { Component } from '@angular/core';
import { Sidenav } from 'src/app/models/interfaces/sidenav.model';

@Component({
  selector: 'app-parameters',
  templateUrl: './parameters.component.html',
  styleUrls: ['./parameters.component.scss']
})
export class ParametersComponent {

  public sidenav: Sidenav = {
    groups: [
      {
        title: 'Settings',
        collapsible: false,
        items: [
          {
            name: 'Users',
            routerLink: '../parameters/users',
            icon: 'people',
          },
          {
            name: 'Thematics',
            routerLink: '../parameters/themes',
            icon: 'clipboard',
          },
          {
            name: 'RequiredThematics',
            routerLink: '../parameters/requiredThemes',
            icon: 'clipboard',
          },
          {
            name: 'CrossCuttingIndicators',
            routerLink: '../parameters/indicators',
            icon: 'gauge',
          }
        ]
      }
    ]
  };
}
