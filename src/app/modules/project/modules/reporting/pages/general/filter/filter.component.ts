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
  @Input() startDate: Date;
  endDate: Date;


  @Output() filter: EventEmitter<string> = new EventEmitter<string>();

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
  }

}
