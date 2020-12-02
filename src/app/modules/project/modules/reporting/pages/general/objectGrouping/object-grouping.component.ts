import { Component, OnInit, EventEmitter, Output  } from '@angular/core';

@Component({
  selector: 'app-object-grouping',
  templateUrl: './object-grouping.component.html',
  styleUrls: ['./object-grouping.component.scss']
})
export class ObjectGroupingComponent implements OnInit {

  @Output() grouping: EventEmitter<string> = new EventEmitter<string>();

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

  onChangeGrouping(event) {
    this.grouping.emit(event.value);
  }

}
