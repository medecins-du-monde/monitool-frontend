import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Form } from 'src/app/models/classes/form.model';
import { Project } from 'src/app/models/classes/project.model';
import { ProjectService } from 'src/app/services/project.service';
import { Entity } from 'src/app/models/classes/entity.model';
import TimeSlot from 'timeslot-dag';
import { TranslateService } from '@ngx-translate/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { InputService } from 'src/app/services/input.service';
import { Input } from 'src/app/models/classes/input.model';
import { ComponentCanDeactivate } from 'src/app/guards/pending-changes.guard';
import * as _ from 'lodash';
import BreadcrumbItem from 'src/app/models/interfaces/breadcrumb-item.model';
import { HotTableRegisterer } from '@handsontable/angular';



@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})

export class EditComponent implements OnInit, OnDestroy, ComponentCanDeactivate{
// TODO: Check if we can make this component cleaner and simplier
  private subscription: Subscription = new Subscription();
  formId: string;
  siteId: string;
  project: Project;
  timeSlotDate: any;
  timeSlot: TimeSlot;
  previousTimeSlot: TimeSlot;
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
  input: Input;
  inputForm: FormGroup;
  previousInput: Input;
  private initValue: any;
  private hotRegisterer = new HotTableRegisterer();
  tableSettings: any;

  @HostListener('window:beforeunload')
  canDeactivate(): Observable<boolean> | boolean{
    return !this.canBeSaved;
  }

  get currentLang() {
    return this.translateService.currentLang ? this.translateService.currentLang : this.translateService.defaultLang;
  }

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private translateService: TranslateService,
    private fb: FormBuilder,
    private inputService: InputService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.projectService.inBigPage.next(false);
    this.subscription.add(
      this.projectService.openedProject.subscribe((project: Project) => {
        this.project = project;
        this.updateData();
      })
    );

    this.subscription.add(
      this.route.params.subscribe(params => {
        this.formId = params.formId;
        this.siteId = params.siteId;
        this.timeSlotDate = params.timeSlot;
        this.updateData();
      })
    );
  }

  onPaste(event: ClipboardEvent, tableId: string, tablePos: number, i: number, j: number): void {
    const data = [];
    const rowData = event.clipboardData.getData('text').split('\n');

    rowData.forEach(row => {
      if (row !== ''){
        data.push(row.split('\t'));
      }
    })

    for (let dx = 0; dx < data.length; dx++) {
      for (let dy = 0; dy < data[dx].length; dy++){
        let myPos = this.isInputCell(tablePos, i+dx, j+dy);
        if (myPos !== false){
          this.inputForm.controls.values.get(`${tableId}`).get(`${myPos}`).setValue(data[dx][dy]);
        }
      }
    }

    // This is used to block the pasted text inside the input and insert everything from this method
    return event.preventDefault();
  }

  async updateData(){
    if (this.project){
      if (this.formId){
        this.form = this.project.forms.find(x => x.id === this.formId);
      }
      if (this.siteId){
        this.site = this.project.entities.find(x => x.id === this.siteId);
      }
      if (this.timeSlotDate && this.form){
        this.timeSlot = new TimeSlot(this.timeSlotDate);

        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' };

        this.firstDate = this.timeSlot.firstDate.toLocaleDateString(this.currentLang, options);
        this.lastDate = this.timeSlot.lastDate.toLocaleDateString(this.currentLang, options);

        this.previousTimeSlot = this.timeSlot.previous();
        const previousDate = this.previousTimeSlot.value;

        this.inputService.get(
          this.project.id,
          this.site.id,
          this.form.id,
          previousDate
        ).then( (response) => {
          if (response && response.length > 0){
            response = response.find(x => x.period === previousDate);
            if (response !== undefined){
              this.previousInput = new Input(response);
            }
          }
        });

      }
    }


    if (this.project && this.form && this.timeSlotDate){
      let savedInput = await this.getInput();
      if (savedInput && savedInput.length > 0){
        savedInput = savedInput.find(x => x.period === this.timeSlotDate);
        if (savedInput !== undefined){
          this.input = new Input(savedInput);
        }
      }
      this.createForm();
      this.createTable();
      this.updateTotals(this.inputForm.value);

      this.inputForm.valueChanges.subscribe(val => {
        this.convertToNumber(val);
        this.updateTotals(val);
      });

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
          link: `./../../projects/${this.project.id}/input/inputs/${this.form.id}`
        } as BreadcrumbItem,
        {
          value: this.site.name
        } as BreadcrumbItem,
        {
          value: this.timeSlotDate
        } as BreadcrumbItem
      ];
      this.projectService.updateBreadCrumbs(breadCrumbs);
    }
  }

  createForm() {
    const valuesGroup = {};
    for (const e of this.form.elements){
      if (this.input && this.input.values && this.input.values[e.id]){
        valuesGroup[e.id] = this.fb.array(
          this.input.values[e.id]
        );
      }else{
        valuesGroup[e.id] = this.fb.array(
          Array.from({length: this.countInputCells(e)}, () => 0)
        );
      }
    }

    const formGroup = {
      _id: (this.input && this.input.id) ? this.input.id : `input:${this.project.id}:${this.form.id}:${this.site.id}:${this.timeSlotDate}`,
      entity: this.site.id,
      form: this.form.id,
      period: this.timeSlotDate,
      project: this.project.id,
      rev: (this.input && this.input.rev) ? this.input.rev : null,
      values: this.fb.group(valuesGroup)
    };

    this.inputForm = this.fb.group(formGroup);
    this.initValue = _.cloneDeep(this.inputForm) as FormGroup;
  }

  convertToNumber(val) {
    for (const e of this.form.elements){
      val.values[e.id] = val.values[e.id].map(x => +x);
    }
  }

  // TODO optimise this method
  updateTotals(val: any) {
    console.log('update foi chamado');
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
            if (isNaN(val.values[table.id][inputPos])){
              continue;
            }
            sum += val.values[table.id][inputPos];
          }
        }
        table.value[x][table.numberCols - 1] = sum;
        total += sum;
      }
      table.value[table.numberRows - 1][table.numberCols - 1] = total;
      total = 0;
      for (y = table.rows.length; y < (table.numberCols - 1); y += 1){
        let sum = 0;
        for (x = 0; x < table.numberRows; x += 1){
          const inputPos = this.isInputCell(i, x, y);
          if (inputPos !== false){
            if (isNaN(val.values[table.id][inputPos])){
              continue;
            }
            sum += +val.values[table.id][inputPos];
          }
        }
        table.value[table.numberRows - 1][y] = sum;
        total += sum;
      }
      if (total !== 0){
        table.value[table.numberRows - 1][table.numberCols - 1] = total;
      }
      console.log(table);
    }
  }

  createTable(){
    this.tables = [];
    this.tableSettings = {};
    for (const element of this.form.elements){
      const cols = [];
      const rows = [];

      this.numberCols = 0;
      this.numberRows = 0;

      // calculates the total number of rows and cols of the table based on the number of partitions
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
          // leave the cells on the top-left corner empty
          if (i < cols.length || j < rows.length){
            this.table[i].push('');
          }else{
            // all the other cells are filled with 0
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

      let tableObj = {
        id: element.id,
        value: this.table,
        cols,
        rows,
        numberCols: this.numberCols,
        numberRows: this.numberRows,
        displayedColumns: currentCollumns
      }

      tableObj = this.fillValues(element, tableObj);
      
      this.tables.push(tableObj);
      this.tableSettings[element.id] = {
        colHeaders: false,
        rowHeaders: false,
        stretchH: 'all',
        observeChanges: true,
        hotId: 'element.id',
        // updates the inputForm everytime we change something in the table
        beforeChange: (core, changes) => {
          if (changes !== null){
            for (let i = 0; i < changes.length; i+=1){
              let change = changes[i];
              let x = change[0];
              let y = change[1];
              let oldValue = +change[2];
              let newValue = +change[3];
              if (isNaN(newValue)){
                newValue = change[3];
              }
              if (oldValue !== newValue){
                const pos = this.isInputCell(-1, x, y, tableObj); 
                if (pos !== false){
                  change[3] = newValue;
                  this.inputForm.get('values').get(element.id).get(`${pos}`).setValue(newValue);
                }
              }else{
                // dont apply this change
                changes[i] = null;
              }
            }
          }
          console.log(this.tables);
        },
        
        cells: (row, col) => {
          var cellProperties = {currentColClassName: 'currentColumn',};
          if (this.isInputCell(-1, row, col, tableObj) !== false){
            cellProperties['readOnly'] = false;
          }else{
            cellProperties['readOnly'] = true;
          }
          
          if (this.isLabelCell(-1, row, col, tableObj)){
            cellProperties['className'] = 'hot-header-cell';
          }else{
            cellProperties['className'] = 'hot-input-cell';
            cellProperties['validator'] = /^\d+$/;
          }

          return cellProperties;
        }
      };
    }
  }

  fillValues(element, tableObj){
    for (let x = 0; x < tableObj.numberRows; x+=1){
      for (let y = 0; y < tableObj.numberCols; y+=1){
        const pos = this.isInputCell(-1, x, y, tableObj);
        if (pos !== false){
          tableObj.value[x][y] = this.inputForm.get('values').get(element.id).get(`${pos}`).value
        }
      }    
    }
    return tableObj;
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

  // recursive function to fill in the labels of the rows
  // this.x controls which row of the table we are
  // this.y controls which col of the table we are
  // the key to understanding this function is observing how the x and y variables are "global" and
  // their value are being manipulated by the recursion
  //
  // the y is incremented before calling the recursion and
  // decremented after, while the x is only incrementing 
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

  isLabelCell(tablePos, i, j, customTable=null){
    let rows, cols;
    if (customTable === null){
      rows = this.tables[tablePos].rows;
      cols = this.tables[tablePos].cols;
    }else{
      rows = customTable.rows;
      cols = customTable.cols;
    }

    return (i < cols.length || j < rows.length);
  }
  isInputCell(tablePos: number, i: number, j: number, customTable=null){
    let rows;
    let cols;
    let numberRows;
    let numberCols;
    
    if (customTable === null){
      rows = this.tables[tablePos].rows;
      cols = this.tables[tablePos].cols;
      numberRows = this.tables[tablePos].numberRows;
      numberCols = this.tables[tablePos].numberCols;
    }else{
      rows = customTable.rows;
      cols = customTable.cols;
      numberRows = customTable.numberRows;
      numberCols = customTable.numberCols;
    }

    // remove the 'Total' row from the count
    if (rows.length !== 0){
      numberRows -= 1;
    }
    // remove the 'Total' col from the count
    if (cols.length !== 0){
      numberCols -= 1;
    }

    if (i >= cols.length && i < numberRows && j >= rows.length && j < numberCols){
      let nRows = numberRows - cols.length;
      let nCols = numberCols - rows.length;
      i -= cols.length;
      j -= rows.length;

      const pos = i * nCols + j;
      return pos;
    }else{
      return false;
    }
  }

  fillWithPreviousData(){
    if (this.previousInput){
      for (const e of this.form.elements){
        if (this.previousInput && this.previousInput.values && this.previousInput.values[e.id]){
          this.inputForm.get('values').get(e.id).setValue(this.previousInput.values[e.id]);
        }
      }
      this.createTable();
      this.updateTotals(this.inputForm.value);
    }

  }

  async saveInput(){
    const inputToBeSaved = new Input(this.inputForm.value);
    const response = await this.inputService.save(inputToBeSaved);
    if (response){
      this.input = new Input(response);
      this.inputForm.get('rev').setValue(this.input.rev);
      this.router.navigate(['./../../../'], {relativeTo: this.route});
    }
  }

  async deleteInput(){
    const inputToBeDeleted = new Input(this.inputForm.value);
    const response = await this.inputService.delete(inputToBeDeleted);
    if (response) {
      this.router.navigate(['./../../../'], {relativeTo: this.route});
    }
  }

  async getInput(): Promise<any>{
    const response = await this.inputService.get(
      this.project.id,
      this.site.id,
      this.form.id,
      this.timeSlotDate
    );
    return response;
  }

  get canBeSaved(){
    if (!this.input && this.initValue){
      // If new values are differents from the initial ones, we can return true
      return JSON.stringify(this.inputForm.get('values').value) !== JSON.stringify(this.initValue.value.values);
    }
    // If the coming input it different from our form, we can return true
    if (this.inputForm && this.input){
      return JSON.stringify(this.inputForm.get('values').value) !== JSON.stringify(this.input.values);
    }
    return false;
  }
  get inputHasModification(){
    if (this.inputForm && this.input){
      return JSON.stringify(this.inputForm.get('values').value) !== JSON.stringify(this.input.values);
    }
    return false;
  }

  resetInput(){
    this.inputForm = _.cloneDeep(this.initValue) as FormGroup;
    this.createTable();
    this.updateTotals(this.inputForm.value);
    this.inputForm.valueChanges.subscribe(val => {
      this.convertToNumber(val);
      this.updateTotals(val);
    });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
