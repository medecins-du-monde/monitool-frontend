import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-object-grouping',
  templateUrl: './object-grouping.component.html',
  styleUrls: ['./object-grouping.component.scss']
})
export class ObjectGroupingComponent implements OnInit {

  constructor() { }

  groupOptions = [
    {value: 'month', viewValue: 'Month'},
    {value: 'quarter', viewValue: 'Quarter'},
    {value: 'semester', viewValue: 'Semester'},
    {value: 'year', viewValue: 'Year'},
    {value: 'collection sites', viewValue: 'Collection Sites'},
    {value: 'groups', viewValue: 'Groups'}
  ];

  ngOnInit(): void {
  }

}
