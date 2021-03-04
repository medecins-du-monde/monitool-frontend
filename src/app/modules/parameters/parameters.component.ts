import { Component, OnInit } from '@angular/core';
import { Sidenav } from 'src/app/models/interfaces/sidenav.model';

@Component({
  selector: 'app-parameters',
  templateUrl: './parameters.component.html',
  styleUrls: ['./parameters.component.scss']
})
export class ParametersComponent implements OnInit {

  public sidenav: Sidenav = {
    groups: [
      {
        title: 'Settings',
        collapsible: false,
        disable: false,
        items: [
          {
            name: 'Users',
            routerLink: '../parameters/users',
            icon: 'people',
            disable: false
          },
          {
            name: 'Thematics',
            routerLink: '../parameters/themes',
            icon: 'clipboard',
            disable: false
          },
          {
            name: 'CrossCuttingIndicators',
            routerLink: '../parameters/indicators',
            icon: 'gauge',
            disable: false
          }
        ]
      }
    ]
  };

  constructor() { }

  ngOnInit(): void {}

}
