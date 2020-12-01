import { Component, OnInit, EventEmitter, Output  } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  userForm: FormGroup;
  collapsed = true;
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
  }

}
