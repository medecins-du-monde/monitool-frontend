import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import {  FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-object-grouping',
  templateUrl: './object-grouping.component.html',
  styleUrls: ['./object-grouping.component.scss']
})
export class ObjectGroupingComponent implements OnInit {

  dimensionForm: FormGroup;
  @Input() isCrosscuttingReport = false;
  @Output() dimensionEvent: EventEmitter<string> = new EventEmitter<string>();
  
  groupOptions: { value: string; viewValue: string; }[];

  constructor(private fb: FormBuilder ) { }

  ngOnInit(): void {
    this.groupOptions = [
      {value: 'month', viewValue: 'Month'},
      {value: 'quarter', viewValue: 'Quarter'},
      {value: 'semester', viewValue: 'Semester'},
      {value: 'year', viewValue: 'Year'}
    ];

    if (!this.isCrosscuttingReport){
      this.groupOptions = this.groupOptions.concat(
        [
          {value: 'entity', viewValue: 'Collection Sites'},
          {value: 'group', viewValue: 'Groups'}
        ]
      );
    }

    const initialValue = 'month';
    this.dimensionForm = this.fb.group({
      dimensionId: initialValue
    });

    this.dimensionEvent.emit(initialValue);
    this.dimensionForm.get('dimensionId').valueChanges.subscribe( value => {
      this.dimensionEvent.emit(value);
    });
  }

}
