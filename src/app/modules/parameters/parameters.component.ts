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
        title: 'Settings',
        collapsible: false,
        items: [
          {
            name: 'Users',
            routerLink: '../parameters/users',
            icon: 'people'
          },
          {
            name: 'Thematics',
            routerLink: '../parameters/themes',
            icon: 'clipboard'
          },
          {
            name: 'CrossCuttingIndicators',
            routerLink: '../parameters/indicators',
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
