import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {

  displayedColumns: string[] = ['name', 'baseline', 'target', 'Q1', 'total'];


   dataSource =  [
    {name: "test1", baseline: 5, target: 1.0079, Q1: 'H', total: 2},
    {name: "test2", baseline: 5, target: 1.0079, Q1: 'H', total: 2},
    {name: "test3", baseline: 5, target: 1.0079, Q1: 'H', total: 2},
    {name: "test4", baseline: 5, target: 1.0079, Q1: 'H', total: 2},
  ]

  constructor() { }

  

  ngOnInit(): void {
  }

}
