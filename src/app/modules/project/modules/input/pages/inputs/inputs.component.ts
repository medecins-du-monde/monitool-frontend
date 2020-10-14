import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from 'src/app/models/project.model';
import { Subscription } from 'rxjs';
import TimeSlot from 'timeslot-dag';
import { Form } from 'src/app/models/form.model';

export enum TimeSlotPeriodicity {
  day = 'day',
  monthWeekSat = 'month_week_sat',
  monthWeekSun = 'month_week_sun',
  monthWeekMon = 'month_week_mon',
  weekSat = 'week_sat',
  weekSun = 'week_sun',
  weekMon = 'week_mon',
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

  displayedColumns: string[] = [
    'Date',
    'CSP Bimbo 1',
    'CSP Bimbo 2',
    'CSP Bimbo 3',
    'CSP Begoua 1',
    'CSP Begoua 2',
    'CSP Begoua 3',
    'CSP Begoua 4'
  ];
  dataSource = [
    {
      Date: '2016-Q2',
      'CSP Bimbo 1': 12,
      'CSP Bimbo 2': 100,
      'CSP Bimbo 3': 75,
      'CSP Begoua 1': 23,
      'CSP Begoua 2': 15,
      'CSP Begoua 3': 0,
      'CSP Begoua 4': 79,
    },
    {
      Date: '2016-Q2',
      'CSP Bimbo 1': 0,
      'CSP Bimbo 2': 100,
      'CSP Bimbo 3': 0,
      'CSP Begoua 1': 23,
      'CSP Begoua 2': 34,
      'CSP Begoua 3': 100,
      'CSP Begoua 4': 0,
    },
    {
      Date: '2016-Q2',
      'CSP Bimbo 1': 23,
      'CSP Bimbo 2': 100,
      'CSP Bimbo 3': 75,
      'CSP Begoua 1': 0,
      'CSP Begoua 2': 0,
      'CSP Begoua 3': 100,
      'CSP Begoua 4': 100,
    },
  ];
  formId: any;

  sites = [];
  private subscription: Subscription = new Subscription();

  project: Project;
  form: Form;
  dates: string[];

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService
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

  atualizeData(){
    this.form = this.project.forms.find(x => x.id = this.formId);
    this.sites = this.form ? this.form.entities.map(x => x.name) : [];
    this.displayedColumns = ['Date'].concat(this.sites);
    this.dates = [];
    if (this.form){
      let slotStart = TimeSlot.fromDate(this.form.start, TimeSlotPeriodicity[this.form.periodicity]);
      const slotEnd = TimeSlot.fromDate(this.form.end, TimeSlotPeriodicity[this.form.periodicity]);

      if (slotStart === slotEnd){
        this.dates = [slotStart.humanizeValue('en')];
      }else{
        while (slotStart !== slotEnd){
          this.dates.push(slotStart.humanizeValue('en'));
          slotStart = slotStart.next();
        }
      }
      console.log(this.dates);
    }


    const newDataSource = [];
    for (const date of this.dates){
      const current = { Date: date };

      for (const site of this.sites){
        current[site] = Math.floor((Math.random() * 101));
      }
      newDataSource.push(current);
    }
    this.dataSource = newDataSource;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
