// tslint:disable: no-string-literal
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from 'src/app/models/classes/project.model';
import { Subscription } from 'rxjs';
import TimeSlot from 'timeslot-dag';
import { Form } from 'src/app/models/classes/form.model';
import { TranslateService } from '@ngx-translate/core';
import { InputService } from 'src/app/services/input.service';
import { TimeSlotPeriodicity } from 'src/app/utils/time-slot-periodicity';
import InformationItem from 'src/app/models/interfaces/information-item';
import { User } from 'src/app/models/classes/user.model';
import { AuthService } from 'src/app/services/auth.service';
import BreadcrumbItem from 'src/app/models/interfaces/breadcrumb-item.model';
import { FormControl } from '@angular/forms';
import DatesHelper from 'src/app/utils/dates-helper';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import { MY_DATE_FORMATS } from 'src/app/utils/format-datepicker-helper';
import { DateService } from 'src/app/services/date.service';



@Component({
  selector: 'app-inputs',
  templateUrl: './inputs.component.html',
  styleUrls: ['./inputs.component.scss'],
  providers: [
    {
      provide: DateAdapter, useClass: MomentDateAdapter,
      deps: [
        MAT_DATE_LOCALE,
        MAT_MOMENT_DATE_ADAPTER_OPTIONS
      ]
    },
    {
      provide: MAT_DATE_FORMATS,
      useValue: MY_DATE_FORMATS
    }
  ]
})
export class InputsComponent implements OnInit, OnDestroy {

  informations = [
    {
      res1: 'InformationPanel.Calendar_entry',
      res2: 'InformationPanel.Calendar_entry_description'
    } as InformationItem,
    {
      res1: 'InformationPanel.Calendar_entry_question1',
      res2: 'InformationPanel.Calendar_entry_response1'
    } as InformationItem
  ];
  // TODO: Check if possible to clean and make simplify this component
  displayedColumns = [];
  dataSource = [];

  seeOlderDatesFlag = true;
  formId: any;

  sites = [];
  private subscription: Subscription = new Subscription();

  project: Project;
  form: Form;
  user: User;
  thisYearDates: any[];
  allDates: any[];
  inputProgress: ArrayBuffer;
  allowedEntities: any[];
  footerColumns: string[] = [];
  dateForm: FormControl;


  get currentDate(){
    return DatesHelper.dateToString(this.dateForm.value);
  }

  get periodicityIsFree(){
    return this.form?.periodicity === 'free';
  }

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private projectService: ProjectService,
    private translateService: TranslateService,
    private inputService: InputService,
    private adapter: DateAdapter<any>,
    private dateService: DateService,
  ) { }

  ngOnInit(): void {
    this.dateForm = new FormControl(new Date());
    this.projectService.inBigPage.next(true);

    this.dateService.currentLang.subscribe(
      lang => {
        this.adapter.setLocale(lang);
      }
    );

    this.subscription.add(
      this.projectService.openedProject.subscribe((project: Project) => {
        this.project = project;
        this.authService.currentUser.subscribe((user: User) => {
          this.user = user;
        });
        this.updateData();
      })
    );
    this.subscription.add(
      this.route.params.subscribe(params => {
        this.formId = params.formId;
        this.form = this.project.forms.find(x => x.id === this.formId);

        if (this.form && this.project) {
          const breadCrumbs = [
            {
              value: 'Projects',
              link: './../../projects'
            } as BreadcrumbItem,
            {
              value: this.project.country,
            } as BreadcrumbItem,
            {
              value: this.project.name,
            } as BreadcrumbItem,
            {
              value: this.form.name,
            } as BreadcrumbItem,
          ];
          this.projectService.updateBreadCrumbs(breadCrumbs);
        }
        this.updateData();
      })
    );
    this.projectService.updateInformationPanel(this.informations);
  }

  get currentLang() {
    return this.translateService.currentLang ? this.translateService.currentLang : this.translateService.defaultLang;
  }

  async updateData(){
    if (this.formId && this.project){
      this.form = this.project.forms.find(x => x.id === this.formId);
      this.sites = this.form ? this.form.entities : [];
      
      this.allowedEntities = [];
      // We show only columns of data in which the current user has rights
      if (this.user.type === 'partner' && this.user.role === 'input') {
        this.allowedEntities = this.sites.filter(e => this.user?.entities.find((id: any) => id === e.id));
      } else if (this.user.type === 'user') {
        const projectUser = this.project.users.filter(user => user.id === this.user['_id']);
        this.allowedEntities = this.sites;
        if (projectUser.length > 0 && projectUser[0].role === 'input') {
          this.allowedEntities = projectUser[0].entities;
        }
      } else {
        this.allowedEntities = this.sites;
      }
      this.displayedColumns = ['Date'].concat(this.allowedEntities.map(x => x.name));
      this.footerColumns = ['footerDate'].concat(this.allowedEntities.map(x => x.id));
    }
    this.thisYearDates = [];
    this.allDates = [];
    if (this.form){
      let firstDate = new Date();
      if (firstDate > this.form.end && this.form.end){
        firstDate = this.form.end;
      }
      const currentYear = firstDate.getFullYear().toString();

      if (this.form.periodicity !== 'free'){
        // this represents the most recent available time slot of the form
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
            let test = slotStart.value;
            
            slotStart = slotStart.previous();
          }
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
        }
      }
    }

    if (this.project && this.form){

      this.inputProgress = await this.inputService.list(this.project.id, this.formId);

      const newDataSource = [];
      if (this.form.periodicity === 'free'){
        let datesSet = new Set();
        for (const key of Object.keys(this.inputProgress)){
          let [ , , , , , inputDateStr] = key.split(':');
          datesSet.add(inputDateStr)
        }
        this.thisYearDates = Array.from(datesSet).map((inputDateStr: string) => {
          let dayAsString = 'day';
          let dateSlot = TimeSlot.fromDate(inputDateStr, TimeSlotPeriodicity[dayAsString])
          return {
            humanValue: dateSlot.humanizeValue(this.currentLang),
            value:  dateSlot.value
          }
        });
    
      }
      const inputId = `input:${this.project.id}:${this.formId}`;
      for (const date of this.thisYearDates){
        const current = { Date: date.humanValue };

        for (const site of this.sites){

          if (`${inputId}:${site.id}:${date.value}` in this.inputProgress){
            current[site.name] = {
              value: 100 * this.inputProgress[`${inputId}:${site.id}:${date.value}`],
              routerLink: `./edit/${site.id}/${date.value}`
            };
          }else{
            current[site.name] = {
              value: -1,
              routerLink: `./edit/${site.id}/${date.value}`
            };
          }
        }
        newDataSource.push(current);
      }
      this.dataSource = newDataSource;
    }
  }

  seeOlderDates(){

    const inputId = `input:${this.project.id}:${this.formId}`;
    const newDataSource = [];
    for (const date of this.allDates){
      const current = { Date: date.humanValue };

      for (const site of this.sites){
        if (`${inputId}:${site.id}:${date.value}` in this.inputProgress){
          current[site.name] = {
            value: 100 * this.inputProgress[`${inputId}:${site.id}:${date.value}`],
            routerLink: `./edit/${site.id}/${date.value}`
          };
        }
        else{
          current[site.name] = {
            value: -1,
            routerLink: `./edit/${site.id}/${date.value}`
          };
        }
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
