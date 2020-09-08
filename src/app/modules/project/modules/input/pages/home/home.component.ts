import { Component, OnInit } from '@angular/core';

export interface Task {
  taskText1: string;
  buttonText1: string;
  buttonIcon1: string;
  status: number;
  routerLink1: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  displayedColumns: string[] = ['task', 'status'];
  dataSource: Task[];

  constructor() { }

  ngOnInit(): void {
    this.dataSource = [
      {
        taskText1: 'Remplir les 119 saisies de ',
        buttonIcon1: 'edit',
        buttonText1: 'Extraction du SNIS (CSP)',
        status: 100,
        routerLink1: `.`,
      },
      {
        taskText1: 'Remplir les 119 saisies de ',
        buttonIcon1: 'edit',
        buttonText1: 'Registre pharmacie (CSP)',
        status: 30,
        routerLink1: `.`,
      },
      {
        taskText1: 'Remplir les 42 saisies de ',
        buttonIcon1: 'edit',
        buttonText1: 'Rapport de supervision trimestriel (CSP)',
        status: 45,
        routerLink1: `.`,
      },
      {
        taskText1: 'Remplir les 144 saisies de ',
        buttonIcon1: 'edit',
        buttonText1: 'Registre des VLG (CSP & Unité mobile)',
        status: 0,
        routerLink1: `.`,
      },
      {
        taskText1: 'Remplir les 36 saisies de ',
        buttonIcon1: 'edit',
        buttonText1: 'Extraction du SNIS (Hôpital de référence)',
        status: 0,
        routerLink1: `.`,
      },
      {
        taskText1: 'Remplir les 36 saisies de ',
        buttonIcon1: 'edit',
        buttonText1: 'Registre des VLG (Hôpital de référence)',
        status: 0,
        routerLink1: `.`,
      },
      {
        taskText1: 'Remplir les 126 saisies de ',
        buttonIcon1: 'edit',
        buttonText1: 'Recensement',
        status: 0,
        routerLink1: `.`,
      },
      {
        taskText1: 'Remplir les 6 saisies de ',
        buttonIcon1: 'edit',
        buttonText1: 'Coordination',
        status: 0,
        routerLink1: `.`,
      },
    ];
  }

}
