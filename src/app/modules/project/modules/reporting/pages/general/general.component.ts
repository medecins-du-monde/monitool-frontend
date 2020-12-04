import { Component, OnInit, OnDestroy } from '@angular/core';


@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss'],
})
export class GeneralComponent implements OnInit {

  constructor() { }

  // dimensions = ['2020-Q3', '2020-Q4', '2021-Q1', '2021-Q2',	'2021-Q3', '2021-Q4', 'Total'];
  dimensions = ['2020-S2', '2021-S1', '2021-S2', 'Total'];

  ngOnInit(): void {
  }

}


