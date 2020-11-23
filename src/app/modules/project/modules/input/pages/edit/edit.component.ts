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
      this.updateTotals(this.inputForm.value);
    }


  }

  createForm() {

    const formGroup = {
      _id: `${this.project.id}:${this.form.id}:${this.site.id}:${this.timeSlotDate}`,
      entity: `${this.site.id}`,
      form: `${this.form.id}`,
      period: `${this.timeSlotDate}`,
      project: `${this.project.id}`,
    };

    const getRandomInt = (max) => {
      return Math.floor(Math.random() * Math.floor(max));
    };

    for (const e of this.form.elements){
      formGroup[e.id] = this.fb.array(
        Array.from({length: this.countInputCells(e)}, (_, i) => getRandomInt(5))
      );
    }

    this.inputForm = this.fb.group(formGroup);

    this.inputForm.valueChanges.subscribe(val => {
      this.updateTotals(val);
    });

    console.log(this.inputForm);
  }

  updateTotals(val: any) {
    for (let i = 0; i < this.tables.length; i += 1){
      const table = this.tables[i];
      let x: number;
      let y: number;
      let total = 0;
      for (x = table.cols.length; x < table.numberRows - 1; x += 1){
        let sum = 0;
        for (y = 0; y < table.numberCols; y += 1){
          const inputPos = this.isInputCell(i, x, y);
          if (inputPos !== false){
            sum += +val[table.id][inputPos];
          }
        }
        table.value[x][table.numberCols - 1] = sum;
        total += sum;
      }

      for (y = table.rows.length; y < (table.numberCols - 1); y += 1){
        let sum = 0;
        for (x = 0; x < table.numberRows; x += 1){
          const inputPos = this.isInputCell(i, x, y);
          if (inputPos !== false){
            sum += +val[table.id][inputPos];
          }
        }
        table.value[table.numberRows - 1][y] = sum;
      }
      table.value[table.numberRows - 1][table.numberCols - 1] = total;
    }
  }

  createTable(){
    for (const element of this.form.elements){
      // TO DO
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
            this.table[i].push(0);
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
        id: element.id,
        value: this.table,
        cols,
        rows,
        numberCols: this.numberCols,
        numberRows: this.numberRows,
        displayedColumns: currentCollumns
      });

    }
    console.log(this.tables);

  }

  fillTotalLabels(rows, cols) {
    const numOr0 = n => isNaN(n) ? 0 : n;
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


  countInputCells(variable){
    console.log(variable);

    const rows = [];
    const cols = [];

    let numberRows = 1;
    let numberCols = 1;

    let i = 0;
    for (i = 0; i < variable.distribution; i += 1){
      rows.push(variable.partitions[i]);
      numberRows *= variable.partitions[i].elements.length;
    }
    for (i = variable.distribution; i < variable.partitions.length; i += 1){
      cols.push(variable.partitions[i]);
      numberCols *= variable.partitions[i].elements.length;
    }

    return numberCols * numberRows;
  }

  isInputCell(tablePos, i, j){
    const rows = this.tables[tablePos].rows;
    const cols = this.tables[tablePos].cols;
    const numberRows = this.tables[tablePos].numberRows;
    const numberCols = this.tables[tablePos].numberCols;

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
