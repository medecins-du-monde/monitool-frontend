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

    this.groupOptions = [];
    
    if (!this.isCrosscuttingReport){
      this.groupOptions = this.groupOptions.concat(
        [
          {value: 'day', viewValue: 'TimePeriods.day'},
          {value: 'month_week_sat', viewValue: 'TimePeriods.month_week_sat'},
          {value: 'month_week_sun', viewValue: 'TimePeriods.month_week_sun'},
          {value: 'month_week_mon', viewValue: 'TimePeriods.month_week_mon'},
          {value: 'week_sat', viewValue: 'TimePeriods.week_sat'},
          {value: 'week_sun', viewValue: 'TimePeriods.week_sun'},
          {value: 'week_mon', viewValue: 'TimePeriods.week_mon'},
        ]
      );
    }
    this.groupOptions = this.groupOptions.concat(
      [
        {value: 'month', viewValue: 'TimePeriods.month'},
        {value: 'quarter', viewValue: 'TimePeriods.quarter'},
        {value: 'semester', viewValue: 'TimePeriods.semester'},
        {value: 'year', viewValue: 'TimePeriods.year'}
      ]
    );

    if (!this.isCrosscuttingReport){
      this.groupOptions = this.groupOptions.concat(
        [
          {value: 'entity', viewValue: 'CollectionSites'},
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
