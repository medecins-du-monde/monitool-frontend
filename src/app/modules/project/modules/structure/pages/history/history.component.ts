import { Component, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', padding: '0px'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class HistoryComponent implements OnInit {
  displayedColumns: string[] = ['date', 'changes'];
  dataSource = [
    {
      date: 'Nov 13, 2019 4:24:16 PM',
      username: 'training',
      changes: [
        'Create logical framework <code>UE</code>',
        'Add the new site <code>MDM</code>',
        'Add the new site <code>CENTRE SOCIAL SOUBRE</code>',
        'Add the new site <code>CENTRE SOCIAL MEAGUI</code>',
      ]
    },
    {
      date: 'Nov 13, 2019 4:24:16 PM',
      username: 'training',
      changes: [
        'Create logical framework <code>UE</code>',
        'Add the new site <code>MDM</code>',
        'Add the new site <code>CENTRE SOCIAL SOUBRE</code>',
        'Add the new site <code>CENTRE SOCIAL MEAGUI</code>',
      ]
    },
    {
      date: 'Nov 13, 2019 4:24:16 PM',
      username: 'training',
      changes: [
        'Add the variable <code># de jeunes sensibilisés VBG</code> to <code>Rapport Référencement</code>'
      ]
    },
  ];
  expandedElement: null;

  constructor() { }

  ngOnInit(): void {

  }

  mouseOver(element){
    this.expandedElement = element;
  }

  mouseLeave(){
    this.expandedElement = null;
  }

}
