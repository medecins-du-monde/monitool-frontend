import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from 'src/app/models/project.model';
import { Subscription } from 'rxjs';
import TimeSlot from 'timeslot-dag';
import { Form } from 'src/app/models/form.model';
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
  selector: 'app-inputs',
  templateUrl: './inputs.component.html',
  styleUrls: ['./inputs.component.scss']
})
export class InputsComponent implements OnInit, OnDestroy {
  displayedColumns = [];
  dataSource = [];

  seeOlderDatesFlag = true;
  formId: any;

  sites = [];
  private subscription: Subscription = new Subscription();

  project: Project;
  form: Form;
  thisYearDates: any[];
  allDates: any[];

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
        this.atualizeData();
      })
    );
  }

  get currentLang() {
    return this.translateService.currentLang ? this.translateService.currentLang : this.translateService.defaultLang;
  }

  atualizeData(){
    this.form = this.project.forms.find(x => x.id === this.formId);
    // this.sites = this.form ? this.form.entities.map(x => x.name) : [];
    this.sites = this.form ? this.form.entities : [];
    this.displayedColumns = ['Date'].concat(this.sites.map(x => x.name));
    this.thisYearDates = [];
    this.allDates = [];
    if (this.form){
      let firstDate = new Date();
      if (firstDate > this.form.end){
        firstDate = this.form.end;
      }
      const currentYear = firstDate.getFullYear().toString();

      // this represents the last availabe time slot of the form
      let slotStart = TimeSlot.fromDate(firstDate, TimeSlotPeriodicity[this.form.periodicity]);

      // this is the oldest date of the form
      const slotEnd = TimeSlot.fromDate(this.form.start, TimeSlotPeriodicity[this.form.periodicity]);

      if (slotStart === slotEnd){
        this.thisYearDates = [
          {
            humanValue: slotStart.humanizeValue(this.currentLang),
            value: slotStart.value
          }
        ];
        this.allDates = [{
         humanValue: slotStart.humanizeValue(this.currentLang),
         value: slotStart.value
        }];
      }else{
        while (slotStart !== slotEnd){
          if (currentYear === slotStart.value.slice(0, 4)){
            this.thisYearDates.push({
              humanValue: slotStart.humanizeValue(this.currentLang),
              value: slotStart.value
            });
          }
          this.allDates.push({
            humanValue: slotStart.humanizeValue(this.currentLang),
            value: slotStart.value
          });
          slotStart = slotStart.previous();
        }
      }
    }

    const newDataSource = [];
    for (const date of this.thisYearDates){
      const current = { Date: date.humanValue };

      for (const site of this.sites){
        current[site.name] = {
          value: Math.floor((Math.random() * 101)),
          routerLink: `./edit/${site.id}/${date.value}`
          // the link needs to pass:
          // (done) project_id
          // (done) form id
          // collection_site id
          // time period reference
          // variable/input id ?????
        };
      }
      newDataSource.push(current);
    }
    this.dataSource = newDataSource;
  }

  seeOlderDates(){
    const newDataSource = [];
    for (const date of this.allDates){
      const current = { Date: date };

      for (const site of this.sites){
        current[site.name] = Math.floor((Math.random() * 101));
      }
      newDataSource.push(current);
    }
    this.dataSource = newDataSource;

    this.seeOlderDatesFlag = false;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
