// tslint:disable: no-string-literal
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
import { Entity } from 'src/app/models/classes/entity.model';
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

  formId: any;

  sites = [];
  private subscription: Subscription = new Subscription();

  project: Project;
  form: Form;
  user: User;
  allDates: any[];
  inputProgress: ArrayBuffer;
  allowedEntities: any[];
  footerColumns: string[] = [];
  dateForm: FormControl;
  slotStart: TimeSlot;
  slotEnd: TimeSlot;
  differentInputDates: { humanValue: string; value: string; }[] = [];
  endDateReached = false;

  lastDates = {};

  public isOwner = false;
  private isFocused = false;


  get currentDate(): string {
    return DatesHelper.dateToString(this.dateForm.value);
  }

  get periodicityIsFree(): boolean{
    return this.form?.periodicity === 'free';
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
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

    this.subscription.add(
      this.dateService.currentLang.subscribe( lang => {
        this.adapter.setLocale(lang);
      })
    );

    this.subscription.add(
      this.projectService.openedProject.subscribe((project: Project) => {
        this.project = project;
        this.updateData();
        // Set isOwner property
        if (!this.isOwner && this.user && project.users) {
          const projectUser = project.users.find(user => user.id === this.user.id || user.username === this.user.id);
          this.isOwner = projectUser && projectUser.role === 'owner';
        }
      })
    );
    this.subscription.add(
      this.authService.currentUser.subscribe((user: any) => {
        this.user = user;
        this.user.id = user._id || user.username;
        if (user.role === 'admin') {
          this.isOwner = true;
        }
      })
    );
    this.subscription.add(
      this.route.params.subscribe(params => {
        this.formId = params.formId;
        this.form = this.project?.forms.find(x => x.id === this.formId);

        this.dataSource = [];

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

    window.addEventListener('focus', () => {
      this.updateData();
    });
  }

  get currentLang(): string {
    return this.translateService.currentLang ? this.translateService.currentLang : this.translateService.defaultLang;
  }

  updateData(){
    this.lastDates = {};
    if (this.formId && this.project && this.user){

      this.form = this.project.forms.find(x => x.id === this.formId);
      this.sites = this.form ? this.form.entities : [];

      this.allowedEntities = this.sites;


      // We show only columns of data in which the current user has rights
      let projectUser;

      // const projectUser = this.project.users.filter(user => user.id === this.user['_id']);
      if (this.user.type === 'partner') {
        projectUser = this.project.users.find(user => user.username === this.user.username);
      } else {
        projectUser = this.project.users.find(user => user.id === this.user['_id']);
      }


      if (this.user.role !== 'admin') {
        if (projectUser.role === 'input') {
          this.allowedEntities = this.sites.filter(e => projectUser.entities.find((entity: Entity) => entity.id === e.id));
        }
        else if (projectUser.role === 'read') {
          this.allowedEntities =  [];
        }
      }

      this.displayedColumns = ['Date'].concat(this.allowedEntities.map(x => x.name));
      this.footerColumns = ['footerDate'].concat(this.allowedEntities.map(x => x.id));
    }

    if (this.form){
      // get the inputs from the backend
      this.inputService.list(this.project.id, this.formId).then(input => {
        this.inputProgress = input;

        // get the date of today and compares it with the end date of the form to see which one happens first
        this.allDates = [];
        let firstDate = new Date();
        if (firstDate > this.form.end && this.form.end){
          firstDate = this.form.end;
        }
        this.endDateReached = false;

        if (this.form.periodicity !== 'free'){
          // this represents the most recent available time slot of the form
          this.slotStart = TimeSlot.fromDate(firstDate, TimeSlotPeriodicity[this.form.periodicity]);

          // this is the oldest date of the form
          this.slotEnd = TimeSlot.fromDate(this.form.start, TimeSlotPeriodicity[this.form.periodicity]);
        }

        // in this case we can't use timeSlots to give us all dates
        // we take all the dates already existent in the inputs saved
        // and remove the duplicates by adding them to a set
        if (this.form.periodicity === 'free'){

          // if we dont have anything saved we just return
          if (Object.keys(this.inputProgress).length === 0){
            this.endDateReached = true;
            return;
          }

          // remove duplicate dates
          const datesSet = new Set();
          for (const key of Object.keys(this.inputProgress)){
            const [ , , , , , inputDateStr] = key.split(':');
            datesSet.add(inputDateStr);
          }

          // sort the dates and store them in an array in the timeSlot format
          this.differentInputDates = Array.from(datesSet).sort((a: string, b: string) => b.localeCompare(a)).map((inputDateStr: string) => {
            const dayPeriodicity = TimeSlotPeriodicity['day'];
            const dateSlot = TimeSlot.fromDate(inputDateStr, dayPeriodicity as any);
            return {
              humanValue: dateSlot.humanizeValue(this.currentLang),
              value:  dateSlot.value
            };
          });
        }
        this.dataSource = [];
        this.seeOlderDates();
      });
    }
  }

  // add new rows to the table
  seeOlderDates(): void{
    const nextDates = this.getNext10dates();
    this.allDates = this.allDates.concat(nextDates);

    const inputId = `input:${this.project.id}:${this.formId}`;
    const newDataSource = [];
    for (const date of nextDates){
      const current = { Date: date.humanValue };

      for (const site of this.sites){
        if (!this.lastDates[site.id] && date.date <= site.end || this.form.periodicity === 'free') {
          if (`${inputId}:${site.id}:${date.value}` in this.inputProgress){
            current[site.name] = {
              blocked: this.inputProgress[`${inputId}:${site.id}:${date.value}`].blocked,
              value: 100 * this.inputProgress[`${inputId}:${site.id}:${date.value}`].progress,
              column: site.id,
              date: date.value,
            };
          } else{
            current[site.name] = {
              value: -1,
              column: site.id,
              date: date.value,
            };
          }
          if (date.date <= site.start.setHours(12)) {
            this.lastDates[site.id] = true;
          }
        } else {
          current[site.name] = {
            value: -2
          };
        }
      }
      newDataSource.push(current);
    }
    this.dataSource = this.dataSource.concat(newDataSource);
  }

  // get the next 10 valid dates for the form
  getNext10dates(){
    const dates = [];
    if (this.form.periodicity !== 'free'){
      let datesAdded = 0;
      while (datesAdded < 10 && !this.endDateReached){
        if (this.slotStart.firstDate <= this.slotEnd.firstDate){
          this.endDateReached = true;
          break;
        }
        dates.push({
          humanValue: this.slotStart.humanizeValue(this.currentLang),
          value: this.slotStart.value,
          date: this.slotStart.firstDate
        });
        this.slotStart = this.slotStart.previous();
        datesAdded += 1;
      }

    } else {
      let datesAdded = 0;

      while (datesAdded < 10 && !this.endDateReached){
        dates.push(this.differentInputDates.shift());

        if (this.differentInputDates.length === 0){
          this.endDateReached = true;
        }
        datesAdded += 1;
      }

    }
    return dates;
  }

  openLinkInNewWindow(column, date) {
    const url = this.router.serializeUrl(
      this.router.createUrlTree(['edit', column, date], { relativeTo: this.route })
    );

    window.open(url, '_blank');
  }

  dateAlreadyExist(column, date) {
    const inputId = `input:${this.project.id}:${this.formId}`;
    if (this.inputProgress && `${inputId}:${column}:${date}` in this.inputProgress){
      return true;
    }
    return false;
  }

  toggleBlock(el: any) {
    const inputId = `input:${this.project.id}:${this.formId}:${el.column}:${el.date}`;
    this.inputService.save({id: inputId, blocked: !el.blocked}).then(res => {
      el.blocked = res.blocked;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
