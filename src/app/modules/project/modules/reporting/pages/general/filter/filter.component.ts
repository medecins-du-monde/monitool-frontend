import { Component, OnInit, EventEmitter, Output, Input  } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  userForm: FormGroup;
  collapsed = true;
  endDate: Date;

  @Input() startDate: Date;
  @Input() sites: any[];

  @Output() filter: EventEmitter<object> = new EventEmitter<object>();

  constructor( private fb: FormBuilder) { }

  toggleCollapsed() {
    this.collapsed = this.collapsed ? false : true;
  }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      startDate: [],
      endDate: [],
      collectionSite: []
    });
    const currentYear = new Date().getFullYear(); //we assume it is last day of the current year
    this.endDate = new Date(currentYear, 11, 31);

    const tempObject = {_start: this.transformDate(this.startDate), _end: this.transformDate(this.endDate)};
    this.filter.emit(tempObject);
  }

  transformDate(date: Date) {
    const month = date.getMonth() + 1;
    const monthWithZero = month <= 9 ? '0'  + month.toString : month.toString();

    const day = date.getDate() + 1;
    const dayWithZero = day <= 9 ? '0'  + day.toString : day.toString();

    const tempDate = date.getFullYear() + '-' + monthWithZero + '-' + dayWithZero;
    return tempDate;
  }



}
