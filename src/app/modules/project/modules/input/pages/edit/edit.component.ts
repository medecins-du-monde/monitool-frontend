import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Form } from 'src/app/models/form.model';
import { Project } from 'src/app/models/project.model';
import { ProjectService } from 'src/app/services/project.service';
import { Entity } from 'src/app/models/entity.model';
import TimeSlot from 'timeslot-dag';
import { TranslateService } from '@ngx-translate/core';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';

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
  inputForm: FormGroup;

  get currentLang() {
    return this.translateService.currentLang ? this.translateService.currentLang : this.translateService.defaultLang;
  }

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private translateService: TranslateService,
    public datepipe: DatePipe,
    private fb: FormBuilder
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

        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' };

        this.firstDate = this.timeSlot.firstDate.toLocaleDateString(this.currentLang, options);
        this.lastDate = this.timeSlot.lastDate.toLocaleDateString(this.currentLang, options);
      }
    }

    if (this.project && this.form){
      this.createForm();
      this.createTable();
    }
  }

  createForm() {
    this.inputForm = this.fb.group({
      _id: `${this.project.id}:${this.form.id}:${this.site.id}:${this.timeSlotDate}`,
      entity: `${this.site.id}`,
      form: `${this.form.id}`,
      period: `${this.timeSlotDate}`,
      project: `${this.project.id}`,
      myValues: this.createValuesGroup()
    });
    console.log(this.form);
    console.log(this.inputForm);
  }
  createValuesGroup(): any {
    const group = this.fb.group({});
    for (const e of this.form.elements){

      group[e.id] = this.fb.array([0, 0, 0, 0]);
    }
    return group;
  }

  createTable(){
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
          if (i < cols.length || j < rows.length){
            this.table[i].push('');
          }else{
            this.table[i].push(2);
          }
        }
      }

      this.fillCollumnLabels(rows, cols);
      this.fillRowLabels(rows, cols);
      this.fillTotalLabels(rows, cols);

      const currentCollumns = [];
      for (let k = 0; k < this.numberCols; k += 1){
        currentCollumns.push(k.toString());
      }

      this.tables.push({
        value: this.table,
        cols,
        rows,
        numberCols: this.numberCols,
        numberRows: this.numberRows,
        displayedColumns: currentCollumns
      });

    }
  }

  fillTotalLabels(rows, cols) {
    const numOr0 = n => isNaN(n) ? 0 : n;
    if (cols.length > 0){
      const y = this.numberCols - 1;
      for (let x = 0; x < cols.length; x += 1){
        this.table[x][y] = 'Total';
      }
      for (let x = cols.length; x <  this.numberRows - 1; x += 1){
        this.table[x][y] = this.table[x].slice(rows.length, this.numberCols - 1).reduce((a, b) => numOr0(a) + numOr0(b));
      }
    }
    if (rows.length > 0){
      const x = this.numberRows - 1;
      for (let y = 0; y < rows.length; y += 1){
        this.table[x][y] = 'Total';
      }
      for (let y = rows.length; y < this.numberCols; y += 1){
        let sum = 0;
        for (let r = cols.length; r < this.numberRows - 1; r += 1){
          sum += numOr0(this.table[r][y]);
        }
        this.table[x][y] = sum;
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


  isInputCell(tableId, i, j){
    const rows = this.tables[tableId].rows;
    const cols = this.tables[tableId].cols;
    const numberRows = this.tables[tableId].numberRows;
    const numberCols = this.tables[tableId].numberCols;

    if ( i >= cols.length && (rows.length === 0 || i < numberRows - 1) && j >= rows.length && (cols.length === 0 || j < numberCols - 1)){
      let nRows = numberRows - cols.length - 1;
      let nCols = numberCols - rows.length - 1;

      if (cols.length === 0){
        nCols += 1;
      }
      if (rows.length === 0){
        nRows += 1;
      }

      i -= cols.length;
      j -= rows.length;

      const pos = i * nCols + j;
      return pos;
    }else{
      return false;
    }
  }


  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
