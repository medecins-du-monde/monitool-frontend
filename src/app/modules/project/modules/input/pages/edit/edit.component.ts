import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Form } from 'src/app/models/form.model';
import { Project } from 'src/app/models/project.model';
import { ProjectService } from 'src/app/services/project.service';
import { Entity } from 'src/app/models/entity.model';
import TimeSlot from 'timeslot-dag';
import { TranslateService } from '@ngx-translate/core';

export enum TimeSlotPeriodicity {
  day = 'day',
  month_week_sat = 'month_week_sat',
  month_week_sun = 'month_week_sun',
  month_week_mon = 'month_week_mon',
  week_sat = 'week_sat',
  week_sun = 'week_sun',
  week_mon = 'week_mon',
  month = 'month',
  quarter = 'quarter',
  semester = 'semester',
  year = 'year',
  all = 'all'
}

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})

export class EditComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription();
  formId: string;
  siteId: string;
  project: Project;
  timeSlotDate: any;
  timeSlot: TimeSlot;
  site: Entity = new Entity({name: ''});
  form: Form = new Form({ name: ''});
  firstDate = '';
  lastDate = '';


  get currentLang() {
    return this.translateService.currentLang ? this.translateService.currentLang : this.translateService.defaultLang;
  }

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private translateService: TranslateService
  ) { }

  ngOnInit(): void {
    this.subscription.add(
      this.projectService.openedProject.subscribe((project: Project) => {
        this.project = project;
        this.atualizeData();
      })
    );

    this.subscription.add(
      this.route.params.subscribe(params => {
        this.formId = params.formId;
        this.siteId = params.siteId;
        this.timeSlotDate = params.timeSlot;
        this.atualizeData();
      })
    );
  }

  atualizeData(){
    if (this.project){
      if (this.formId){
        this.form = this.project.forms.find(x => x.id === this.formId);
      }
      if (this.siteId){
        this.site = this.project.entities.find(x => x.id === this.siteId);
      }
      if (this.timeSlotDate && this.form){
        this.timeSlot = TimeSlot.fromDate(this.timeSlotDate, TimeSlotPeriodicity[this.form.periodicity]);
        console.log(this.timeSlot.firstDate);
        console.log(this.timeSlot.lastDate);

        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        this.firstDate = this.timeSlot.firstDate.toLocaleDateString(this.currentLang, options);
        this.lastDate = this.timeSlot.lastDate.toLocaleDateString(this.currentLang, options);
        console.log(this.timeSlot);
        // const options2 = {year: 'numeric', month: 'long'};
        // console.log(this.timeSlotDate);
        // const date = new Date(Date.parse(this.timeSlotDate));
        // console.log(date.toLocaleDateString('default', options2));
      }
    }
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
