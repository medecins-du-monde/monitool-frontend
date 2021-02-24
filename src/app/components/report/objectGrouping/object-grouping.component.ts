import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import {  FormBuilder, FormGroup } from '@angular/forms';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from 'src/app/models/classes/project.model';
import { Form } from 'src/app/models/classes/form.model';

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

  constructor(private projectService: ProjectService,
              private fb: FormBuilder ) { }

  project: Project;
  forms: Form[] = [];

// TODO: Make it easier
  ngOnInit(): void {
    this.groupOptions = [];
    this.projectService.openedProject.subscribe((project: Project) => {
      this.project = project;
      this.forms = project.forms;

      if (!this.isCrosscuttingReport){
        for (const form of this.project.forms) {
          if (form.periodicity !== 'month' && form.periodicity !== 'quarter' && form.periodicity !== 'semester' && form.periodicity !== 'year') {
            if (form.periodicity === 'day') {
              this.groupOptions = [
                {value: 'day', viewValue: 'TimePeriods.day'},
                {value: 'month_week_sat', viewValue: 'TimePeriods.month_week_sat'},
                {value: 'month_week_sun', viewValue: 'TimePeriods.month_week_sun'},
                {value: 'month_week_mon', viewValue: 'TimePeriods.month_week_mon'},
                {value: 'week_sat', viewValue: 'TimePeriods.week_sat'},
                {value: 'week_sun', viewValue: 'TimePeriods.week_sun'},
                {value: 'week_mon', viewValue: 'TimePeriods.week_mon'},
              ];
              break;
            } else if (form.periodicity === 'month_week_mon') {
              this.groupOptions = this.groupOptions.concat([
                {value: 'month_week_mon', viewValue: 'TimePeriods.month_week_mon'},
                {value: 'week_mon', viewValue: 'TimePeriods.week_mon'}
              ]);
            } else if (form.periodicity === 'month_week_sun') {
              this.groupOptions = this.groupOptions.concat([
                {value: 'month_week_sun', viewValue: 'TimePeriods.month_week_sun'},
                {value: 'week_sun', viewValue: 'TimePeriods.week_sun'}
              ]);
            } else if (form.periodicity === 'month_week_sat') {
              this.groupOptions = this.groupOptions.concat([
                {value: 'month_week_sat', viewValue: 'TimePeriods.month_week_sat'},
                {value: 'week_sat', viewValue: 'TimePeriods.week_sat'}
              ]);
            } else {
              const obj = {value: '', viewValue: ''};
              obj.value = form.periodicity;
              obj.viewValue = 'TimePeriods.' + form.periodicity;
              this.groupOptions.unshift(obj);
            }
          }
        }
      }
    });

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
