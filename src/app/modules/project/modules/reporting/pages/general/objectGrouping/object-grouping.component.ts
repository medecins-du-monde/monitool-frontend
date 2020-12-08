import { Component, OnInit, Input  } from '@angular/core';
import {  FormGroup } from '@angular/forms';

@Component({
  selector: 'app-object-grouping',
  templateUrl: './object-grouping.component.html',
  styleUrls: ['./object-grouping.component.scss']
})
export class ObjectGroupingComponent implements OnInit {

  @Input() requestForm: FormGroup;

  constructor() { }

  groupOptions = [
    {value: 'month', viewValue: 'Month'},
    {value: 'quarter', viewValue: 'Quarter'},
    {value: 'semester', viewValue: 'Semester'},
    {value: 'year', viewValue: 'Year'},
    {value: 'entity', viewValue: 'Collection Sites'},
    {value: 'group', viewValue: 'Groups'}
  ];

  ngOnInit(): void {
  }

  onChangeGrouping(event) {
    this.requestForm.get('grouping').setValue([event.value.value]);
  }

}
