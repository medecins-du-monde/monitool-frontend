import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import {  FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-object-grouping',
  templateUrl: './object-grouping.component.html',
  styleUrls: ['./object-grouping.component.scss']
})
export class ObjectGroupingComponent implements OnInit {

  // @Input() requestForm: FormGroup;

  dimensionForm: FormGroup;
  @Output() dimensionEvent: EventEmitter<string> = new EventEmitter<string>();

  constructor(private fb: FormBuilder ) { }

  groupOptions = [
    {value: 'month', viewValue: 'Month'},
    {value: 'quarter', viewValue: 'Quarter'},
    {value: 'semester', viewValue: 'Semester'},
    {value: 'year', viewValue: 'Year'},
    {value: 'entity', viewValue: 'Collection Sites'},
    {value: 'group', viewValue: 'Groups'}
  ];

  ngOnInit(): void {
    const initialValue = 'quarter';
    this.dimensionForm = this.fb.group({
      dimensionId: initialValue
    });

    this.dimensionEvent.emit(initialValue);
    this.dimensionForm.get('dimensionId').valueChanges.subscribe( value => {
      this.dimensionEvent.emit(value);
    });
  }

}
