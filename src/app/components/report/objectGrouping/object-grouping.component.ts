import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import {  FormBuilder, FormGroup } from '@angular/forms';
import { ProjectIndicator } from 'src/app/models/classes/project-indicator.model';
import { Project } from 'src/app/models/classes/project.model';

@Component({
  selector: 'app-object-grouping',
  templateUrl: './object-grouping.component.html',
  styleUrls: ['./object-grouping.component.scss']
})
export class ObjectGroupingComponent implements OnInit {

  dimensionForm: FormGroup;
  @Input() isCrosscuttingReport = false;
  @Input() project: Project;
  @Output() dimensionEvent: EventEmitter<string> = new EventEmitter<string>();

  groupOptions: { value: string; viewValue: string; }[];

  constructor(private fb: FormBuilder ) { }

  ngOnInit(): void {
    this.groupOptions = [];
    
    // these options appear only in general-report 
    // TO DO: right now they're static but they should be filtered to only show the options
    // compatible with the indicators of the specific project
    if (!this.isCrosscuttingReport){
      let periodicity = [];
      for (const form of this.project.forms) {
        if (form.periodicity !== 'month' && form.periodicity !== 'quarter' && form.periodicity !== 'semester' && form.periodicity !== 'year') {
          let obj = {value: '', viewValue: ''};
          obj.value = form.periodicity;
          obj.viewValue = 'TimePeriods.' + form.periodicity
          periodicity.push(obj);
        }
      }
      this.groupOptions = this.groupOptions.concat(periodicity);
    }
    // these options are static, they appear in general-report and in cross-cutting report
    this.groupOptions = this.groupOptions.concat(
      [
        {value: 'month', viewValue: 'TimePeriods.month'},
        {value: 'quarter', viewValue: 'TimePeriods.quarter'},
        {value: 'semester', viewValue: 'TimePeriods.semester'},
        {value: 'year', viewValue: 'TimePeriods.year'}
      ]
    );

    // these options only appear in the general-report
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
