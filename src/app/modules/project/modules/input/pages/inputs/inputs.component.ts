import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from 'src/app/models/project.model';
import { Subscription } from 'rxjs';
import TimeSlot from 'timeslot-dag';
import { Form } from 'src/app/models/form.model';
import { TranslateService } from '@ngx-translate/core';
import { DatePipe } from '@angular/common';
import { InputService } from 'src/app/services/input.service';
import { TimeSlotPeriodicity } from 'src/app/utils/time-slot-periodicity';



@Component({
  selector: 'app-inputs',
  templateUrl: './inputs.component.html',
  styleUrls: ['./inputs.component.scss']
})
export class InputsComponent implements OnInit, OnDestroy {
  // TODO: Check if possible to clean and make simplify this component
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
  inputProgress: ArrayBuffer;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private translateService: TranslateService,
    public datepipe: DatePipe,
    private inputService: InputService
  ) { }

  ngOnInit(): void {
    this.subscription.add(
      this.projectService.openedProject.subscribe((project: Project) => {
        this.project = project;
        this.updateData();
      })
    );
    this.subscription.add(
      this.route.params.subscribe(params => {
        this.formId = params.formId;
        this.updateData();
      })
    );
  }

  get currentLang() {
    return this.translateService.currentLang ? this.translateService.currentLang : this.translateService.defaultLang;
  }

  async updateData(){
    if (this.formId && this.project){
      this.form = this.project.forms.find(x => x.id === this.formId);
      this.sites = this.form ? this.form.entities : [];
      this.displayedColumns = ['Date'].concat(this.sites.map(x => x.name));
    }
    this.thisYearDates = [];
    this.allDates = [];
    if (this.form){
      let firstDate = new Date();
      if (firstDate > this.form.end){
        firstDate = this.form.end;
      }
      const currentYear = firstDate.getFullYear().toString();
      // this represents the most recent available time slot of the form
      let slotStart = TimeSlot.fromDate(firstDate, TimeSlotPeriodicity[this.form.periodicity]);

      // this is the oldest date of the form
      const slotEnd = TimeSlot.fromDate(this.form.start, TimeSlotPeriodicity[this.form.periodicity]);

      console.log(slotStart);
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

    if (this.project && this.form){

      this.inputProgress = await this.inputService.list(this.project.id, this.formId);

      const inputId = `input:${this.project.id}:${this.formId}`;
      const newDataSource = [];
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
