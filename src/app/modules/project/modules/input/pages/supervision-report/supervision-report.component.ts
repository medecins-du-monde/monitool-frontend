import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-supervision-report',
  templateUrl: './supervision-report.component.html',
  styleUrls: ['./supervision-report.component.scss']
})
export class SupervisionReportComponent implements OnInit {

  displayedColumns: string[] = [
    'Date',
    'CSP Bimbo 1',
    'CSP Bimbo 2',
    'CSP Bimbo 3',
    'CSP Begoua 1',
    'CSP Begoua 2',
    'CSP Begoua 3',
    'CSP Begoua 4'
  ];
  dataSource = [
    {
      Date: '2016-Q2',
      'CSP Bimbo 1': 12,
      'CSP Bimbo 2': 100,
      'CSP Bimbo 3': 75,
      'CSP Begoua 1': 23,
      'CSP Begoua 2': 15,
      'CSP Begoua 3': 0,
      'CSP Begoua 4': 79,
    },
    {
      Date: '2016-Q2',
      'CSP Bimbo 1': 0,
      'CSP Bimbo 2': 100,
      'CSP Bimbo 3': 0,
      'CSP Begoua 1': 23,
      'CSP Begoua 2': 34,
      'CSP Begoua 3': 100,
      'CSP Begoua 4': 0,
    },
    {
      Date: '2016-Q2',
      'CSP Bimbo 1': 23,
      'CSP Bimbo 2': 100,
      'CSP Bimbo 3': 75,
      'CSP Begoua 1': 0,
      'CSP Begoua 2': 0,
      'CSP Begoua 3': 100,
      'CSP Begoua 4': 100,
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
