import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Form } from 'src/app/models/form.model';
import { Project } from 'src/app/models/project.model';
import { ProjectService } from 'src/app/services/project.service';
import { Entity } from 'src/app/models/entity.model';
import TimeSlot from 'timeslot-dag';
import { TranslateService } from '@ngx-translate/core';
import { createInjectable } from '@angular/compiler/src/core';

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
  numberCols: number;
  numberRows: number;
  x: number;
  y: any;
  table: any;
  tables = [];


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

        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        this.firstDate = this.timeSlot.firstDate.toLocaleDateString(this.currentLang, options);
        this.lastDate = this.timeSlot.lastDate.toLocaleDateString(this.currentLang, options);
      }
    }

    if (this.project && this.form){
      this.createTable();
    }
  }

  createTable(){
    console.log(this.form);
    for (const element of this.form.elements){
      // remove this line once we have an option to control the distribution
      element.distribution = 1;

      const cols = [];
      const rows = [];

      this.numberCols = 0;
      this.numberRows = 0;

      let i = 0;
      for (i = 0; i < element.distribution; i += 1){
        rows.push(element.partitions[i]);
        if (this.numberRows === 0) { this.numberRows = 1; }
        this.numberRows *= element.partitions[i].elements.length;
      }
      for (i = element.distribution; i < element.partitions.length; i += 1){
        cols.push(element.partitions[i]);
        if (this.numberCols === 0) { this.numberCols = 1; }
        this.numberCols *= element.partitions[i].elements.length;
      }

      this.numberRows = this.numberRows + cols.length + 1;
      this.numberCols = this.numberCols + rows.length + 1;

      this.table = [];
      for (i = 0; i < this.numberRows; i += 1){
        this.table.push([]);
        for (let j = 0; j < this.numberCols; j += 1 ){
          if (i < cols.length && j < rows.length){
            this.table[i].push('');
          }else{
            this.table[i].push('0');
          }
        }
      }

      this.fillCollumnLabels(rows, cols);
      this.fillRowLabels(rows, cols);
      this.fillTotalLabels(rows, cols);

      this.tables.push(this.table);
    }
    console.log(this.tables);
  }
  fillTotalLabels(rows, cols) {
    if (cols.length > 0){
      const y = this.numberCols - 1;
      for (let x = 0; x < cols.length; x += 1){
        this.table[x][y] = 'Total';
      }
    }
    if (rows.length > 0){
      const x = this.numberRows - 1;
      for (let y = 0; y < rows.length; y += 1){
        this.table[x][y] = 'Total';
      }
    }
  }
  fillRowLabels(rows, cols) {
    this.x = cols.length;
    this.y = 0;

    this.fillCurrentRowLabel(rows, cols, 0);
  }

  fillCurrentRowLabel(rows, cols, pos) {
    if (pos >= rows.length){ return; }
    if (pos === rows.length - 1){
      for (const e of rows[pos].elements){
        this.table[this.x][this.y] = e.name;
        this.x += 1;
      }
      return;
    }

    for (const e of rows[pos].elements){
      this.table[this.x][this.y] = e.name;
      this.y += 1;

      this.fillCurrentRowLabel(rows, cols, pos + 1);
      this.y -= 1;
    }
  }

  fillCollumnLabels(rows, cols) {
    this.x = 0;
    this.y = rows.length;

    this.fillCurrentColLabel(rows, cols, 0);
  }

  fillCurrentColLabel(rows, cols, pos){
    if (pos >= cols.length){ return; }
    if (pos === cols.length - 1){
      for (const e of cols[pos].elements){
        this.table[this.x][this.y] = e.name;
        this.y += 1;
      }
      return;
    }

    for (const e of cols[pos].elements){
      this.table[this.x][this.y] = e.name;
      this.x += 1;
      this.fillCurrentColLabel(rows, cols, pos + 1);
      this.x -= 1;
    }
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
