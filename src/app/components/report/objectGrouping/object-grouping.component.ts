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
  @Input() isCrossCuttingReport = false;
  @Input() project: Project;
  @Output() dimensionEvent: EventEmitter<string> = new EventEmitter<string>();

  groupOptions: { value: string; viewValue: string; }[];

  forms: Form[] = [];
  periodicitiesList = [
  'free',
  'day',
  'month_week_sat',
  'month_week_sun',
  'month_week_mon',
  'week_sat',
  'week_sun',
  'week_mon',
  'month',
  'quarter',
  'semester',
  'year',
  'entity',
  'group'
  ];

  constructor(private projectService: ProjectService,
              private fb: FormBuilder) { }


  get currentPeriodicity(){
    const period = this.dimensionForm.get('dimensionId').value;
    if (period === 'entity' || period === 'group'){
      return 'month';
    }
    return period;
  }

  get currentProjectId(){
     return this.project.id;
  }

  ngOnInit(): void {
    this.updateDimension(8, this.periodicitiesList);
    this.groupOptions = [];
    // If the page is not the cross
    if (!this.isCrossCuttingReport){
      this.projectService.openedProject.subscribe((project: Project) => {
      this.project = project;
      this.forms = project.forms;
      let smallestIndex = this.periodicitiesList.length;
      const newOptionsList = [];
      for (const form of this.project.forms) {
          const index = this.periodicitiesList.indexOf(form.periodicity);
          if ( index !== -1 ) {
            smallestIndex = index < smallestIndex ? index : smallestIndex;
          }
        }
      const limitInf = smallestIndex === 0 ? 1 : smallestIndex;
      for (let i = limitInf; i < this.periodicitiesList.length; i ++) {
          if (this.periodicitiesList[i]) {
            newOptionsList.push({
              value: this.periodicitiesList[i],
              viewValue: `Filter.${this.periodicitiesList[i]}`,
            });
          }
        }
      this.groupOptions = newOptionsList;
      this.updateDimension(smallestIndex, this.periodicitiesList);
      });
    }
    // This part is only of the cross cutting report, it may change later because we don t have many options
    else {
      this.groupOptions = this.groupOptions.concat(
        [
          {value: 'month', viewValue: 'Filter.month'},
          {value: 'quarter', viewValue: 'Filter.quarter'},
          {value: 'semester', viewValue: 'Filter.semester'},
          {value: 'year', viewValue: 'Filter.year'}
        ]
      );
      this.updateDimension(8, this.periodicitiesList);
    }
  }

  /* This method will update the dimension in the parents component
     first with a default value and then with then with the dimension selected by the user
  */
  private updateDimension(index: number, periodicitiesList: string[]): void {
    if (index > 8 && periodicitiesList[index]) {
      this.dimensionForm = this.fb.group({
        dimensionId: periodicitiesList[index]
      });
      this.dimensionEvent.emit(periodicitiesList[index]);
    }
    else {
      this.dimensionForm = this.fb.group({
        dimensionId: 'month'
      });
      this.dimensionEvent.emit('month');
    }
    this.dimensionForm.get('dimensionId').valueChanges.subscribe( value => {
      this.dimensionEvent.emit(value);
    });
  }

}
