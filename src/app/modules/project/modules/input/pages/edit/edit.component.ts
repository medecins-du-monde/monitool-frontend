// tslint:disable:no-shadowed-variable
// tslint:disable:one-variable-per-declaration
import { Component, OnInit, OnDestroy, HostListener, ViewChild, TemplateRef } from '@angular/core';
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
import InformationItem from 'src/app/models/interfaces/information-item';
import BreadcrumbItem from 'src/app/models/interfaces/breadcrumb-item.model';
import DateTimeFormatOptions from 'src/app/models/interfaces/dateTimeFormatOptions.model';
import Parser from 'expr-eval';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmModalComponent } from 'src/app/components/confirm-modal/confirm-modal.component';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})

export class EditComponent implements OnInit, OnDestroy, ComponentCanDeactivate {

  get currentLang(): string {
    return this.translateService.currentLang ? this.translateService.currentLang : this.translateService.defaultLang;
  }

  // Check if the form has any error
  get canBeSaved(): boolean {
    if (this.inputForm) {
      let values: any[];
      for (values of Object.values<Array<any>>(this.inputForm.get('values').value)) {
        if (values.findIndex(v => isNaN(v) && v !== null) !== -1) {
          return false;
        }
      }
    }

    // If the coming input is different from our form, we can return true
    if (this.inputForm && this.input) {
      return JSON.stringify(this.inputForm.get('values').value) !== JSON.stringify(this.input.values);
    }
    else { // if you haven't save it already, you can save if there is at least one value that is not null
      if (this.inputForm) {
        let values: any[];
        for (values of Object.values<Array<any>>(this.inputForm.get('values').value)) {
          if (values.findIndex(v => v !== null) !== -1) {
            return true;
          }
        }
      }
    }

    return false;
  }

  // Check if the initial input got has any modification
  get inputHasModification(): boolean {
    if (!this.input && this.initValue) {
      // If new values are different from the initial ones, we can return true
      return JSON.stringify(this.inputForm.get('values').value) !== JSON.stringify(this.initValue.value.values);
    }
    if (this.inputForm && this.input) {
      return JSON.stringify(this.inputForm.get('values').value) !== JSON.stringify(this.input.values);
    }
    return false;
  }


  // Check if the input has any null values
  get inputHasNull(): boolean {
    if (this.inputForm){
      const formValue = this.inputForm.get('values').value;
      for (const elem in formValue) {
        if (formValue[elem]){
          for (const pos in (formValue[elem] as Array<any>)) {
            if (formValue[elem][pos] === null) {
              return true;
            }
          }
        }
      }
    }
    return false;
  }

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private translateService: TranslateService,
    private fb: FormBuilder,
    private inputService: InputService,
    private router: Router,
    private dialog: MatDialog,
    private userService: UserService,
  ) { }

  informations = [
    {
      res1: 'InformationPanel.Edit_data',
      res2: 'InformationPanel.Edit_data_description'
    } as InformationItem,
    {
      res1: 'InformationPanel.Edit_data_question1',
      res2: 'InformationPanel.Edit_data_response1'
    } as InformationItem,
    {
      res1: 'InformationPanel.Edit_data_question2',
      res2: 'InformationPanel.Edit_data_response2'
    } as InformationItem,
    {
      res1: 'InformationPanel.Edit_data_question3',
      res2: 'InformationPanel.Edit_data_response3'
    } as InformationItem,
    {
      res1: 'InformationPanel.Edit_data_question4',
      res2: 'InformationPanel.Edit_data_response4'
    } as InformationItem,
    {
      res1: 'InformationPanel.Edit_data_question5',
      res2: 'InformationPanel.Edit_data_response5'
    } as InformationItem
  ];

  private showModal: boolean;
  public validInputCell = true;

  // TODO: Check if we can make this component cleaner and simplier
  private subscription: Subscription = new Subscription();
  formId: string;
  siteId: string;
  project: Project;
  timeSlotDate: any;
  timeSlot: TimeSlot;
  site: Entity = new Entity({ name: '' });
  form: Form = new Form({ name: '' });
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
  tableSettings: any;
  expressionParser = new Parser.Parser();
  filledWithZero = false;
  public imageLink: string;

  @ViewChild('nullInputInfoDialog') nullInputInfoDialog: TemplateRef<any>;

  @HostListener('window:beforeunload')
  canDeactivate(): Observable<boolean> | boolean {
    return !this.canBeSaved;
  }

  ngOnInit(): void {
    this.imageLink = 'assets/images/null-data-' + this.currentLang + '.png';
    this.userService.showingInputModal.subscribe(val => {
      this.showModal = val;
    });
    // Set the page with the normal size
    this.projectService.inBigPage.next(false);

    // Subscribe to the current project
    this.subscription.add(
      this.projectService.openedProject.subscribe((project: Project) => {
        this.project = project;
        this.updateData();
      })
    );

    // Subscribe to the parameters in the url
    this.subscription.add(
      this.route.params.subscribe(params => {
        this.formId = params.formId;
        this.siteId = params.siteId;
        this.timeSlotDate = params.timeSlot;
        this.updateData();
      })
    );
    this.projectService.updateInformationPanel(this.informations);
  }

  async updateData(): Promise<void> {
    // Check if we have a project, a formID, a siteID and a timeSlotDate in order to generate the table
    if (this.project && this.formId && this.siteId && this.timeSlotDate) {
      // Get the form
      this.form = this.project.forms.find(x => x.id === this.formId);

      // Check if the form is not null
      if (this.form) {

        // Get the site
        this.site = this.project.entities.find(x => x.id === this.siteId);
        // Format the timeSlot
        this.timeSlot = new TimeSlot(this.timeSlotDate);
        // Options to get the first and last date
        const options: DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' };
        // Getting the first and last date for the table
        this.firstDate = this.timeSlot.firstDate.toLocaleDateString(this.currentLang, options);
        this.lastDate = this.timeSlot.lastDate.toLocaleDateString(this.currentLang, options);
        // Get the previousDate associated to this timeSlot
        const previousDate = this.timeSlot.previous().value;

        // Getting the previous input in order to be able
        // to fill this new input with the data of the previous one
        this.inputService.get(
          this.project.id,
          this.site.id,
          this.form.id,
          previousDate
        ).then((response) => {
          if (response && response.length > 0) {
            response = response.find(x => x.period === previousDate);
            if (response !== undefined) {
              this.previousInput = new Input(response);
            }
          }
        });

        // Get the saved input, if there is
        let savedInput = await this.getInput();
        // Check if there is one
        if (savedInput && savedInput.length > 0) {
          savedInput = savedInput.find(x => x.period === this.timeSlotDate);
          // Why not just else
          if (savedInput !== undefined) {
            // If there is not, we create a new one
            this.input = new Input(savedInput);
          }
        }

        // Creation of the form
        this.createForm();
        // Creation of the table
        this.createTable();
        // Update of the total cell of each row or column
        this.updateTotals(this.inputForm.value);

        // Subscribe to any changes in the form
        this.inputForm.valueChanges.subscribe(val => {
          // Convert the string input to a number
          // this.convertToNumber(val);
          // Update of the total cell of each row or column
          this.updateTotals(val);
        });

        // Update the breadcrumbs informations
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
  }

  createForm(): void {
    // Get all the values already in the current form
    const valuesGroup = {};
    for (const e of this.form.elements) {
      if (this.input && this.input.values && this.input.values[e.id]) {
        valuesGroup[e.id] = this.fb.array(
          this.input.values[e.id]
        );
      } else {
        valuesGroup[e.id] = this.fb.array(
          Array.from({ length: this.countInputCells(e) }, () => null)
        );
      }
    }

    // Create the formGroup
    this.inputForm = this.fb.group({
      _id: (this.input && this.input.id) ? this.input.id : `input:${this.project.id}:${this.form.id}:${this.site.id}:${this.timeSlotDate}`,
      entity: this.site.id,
      form: this.form.id,
      period: this.timeSlotDate,
      project: this.project.id,
      rev: (this.input && this.input.rev) ? this.input.rev : null,
      values: this.fb.group(valuesGroup)
    });

    // Fill the init value with the current value in order to be able to reset
    this.initValue = _.cloneDeep(this.inputForm) as FormGroup;
  }

  // This method convert all the string inputs in a number
  convertToNumber(val) {
    for (const e of this.form.elements) {
      val.values[e.id] = val.values[e.id].map(x => +x);
    }
  }

  // TODO optimise this method
  updateTotals(val: any): void {
    for (let i = 0; i < this.tables.length; i += 1) {
      const table = this.tables[i];
      let x: number;
      let y: number;
      let total = null;

      // Update of the total for all rows
      // chose a row
      for (x = table.cols.length; x < (table.numberRows - 1); x += 1) {
        // sum of the row
        let sum = null;
        // iterate over all collumns for the row chosen
        for (y = 0; y < table.numberCols; y += 1) {
          const inputPos = this.isInputCell(i, x, y);
          if (inputPos !== null) {
            if (!isNaN(val.values[table.id][inputPos])) {
              if (val.values[table.id][inputPos] !== null) {
                if (sum === null) {
                  sum = 0;
                }
                sum += val.values[table.id][inputPos];
              }
            }
          }
        }
        // set the total for the row
        table.value[x][table.numberCols - 1] = sum;
        if (sum !== null) {
          total += sum;
        }
      }
      // set the total of the table
      // if the table doesnt have multiple rows, this will be final
      // otherwise, this value will be overwritten after
      if (table.numberRows > 1 || table.numberCols > 1) {
        table.value[table.numberRows - 1][table.numberCols - 1] = total;
      }

      // Update of the total for all collumns
      // Re-initialisation of the total after having used it for the columns
      if (table.numberCols !== 2) { total = null; }
      for (y = table.rows.length; y < (table.numberCols - 1); y += 1) {
        if (table.numberCols < 3) { total = null; }
        let sum = null;
        for (x = 0; x < table.numberRows; x += 1) {
          const inputPos = this.isInputCell(i, x, y);
          if (inputPos !== null) {
            if (!isNaN(val.values[table.id][inputPos])) {
              if (val.values[table.id][inputPos] !== null) {
                if (sum === null) {
                  sum = 0;
                }
                sum += val.values[table.id][inputPos];
              }
            }
          }
        }
        // set the total for the collumn
        table.value[table.numberRows - 1][y] = sum;
        if (sum !== null) {
          total += sum;
        }
      }
      // if the table has multiple rows and collums the total in the last cell needs to be updated
      if (total !== null) {
        table.value[table.numberRows - 1][table.numberCols - 1] = total;
      }
    }
  }

  createTable(saveMode?: boolean): void {
    // Re-initiate table data and table
    this.tables = [];
    this.tableSettings = {};

    // For every variable of the form
    for (const element of this.form.elements) {
      const cols = [];
      const rows = [];

      this.numberCols = 0;
      this.numberRows = 0;

      // calculates the total number of rows and cols of the table based on the number of partitions
      let i = 0;

      // element.distribution is the number of partitions that are going to form rows in the table
      // the first partitions are rows, the last partitions are cols
      // the number represented by element.distribution says how many of the first partitions are rows

      // we loop through the partitions that are going to be rows
      for (i = 0; i < element.distribution; i += 1) {
        rows.push(element.partitions[i]);
        if (this.numberRows === 0) { this.numberRows = 1; }
        this.numberRows *= element.partitions[i].elements.length;
      }
      // we loop through the remaining partition, they are going to form cols
      for (i = element.distribution; i < element.partitions.length; i += 1) {
        cols.push(element.partitions[i]);
        if (this.numberCols === 0) { this.numberCols = 1; }
        this.numberCols *= element.partitions[i].elements.length;
      }

      this.numberRows = this.numberRows + cols.length + 1;
      this.numberCols = this.numberCols + rows.length + 1;

      this.table = [];
      for (i = 0; i < this.numberRows; i += 1) {
        this.table.push([]);
        for (let j = 0; j < this.numberCols; j += 1) {
          // leave the cells on the top-left corner empty
          if (i < cols.length || j < rows.length) {
            this.table[i].push('');
          } else {
            // all the other cells are filled with 0
            this.table[i].push(0);
          }
        }
      }

      this.fillCollumnLabels(rows, cols);
      this.fillRowLabels(rows, cols);
      this.fillTotalLabels(rows, cols);

      const currentCollumns = [];
      for (let k = 0; k < this.numberCols; k += 1) {
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
      };

      tableObj = this.fillValues(element, tableObj);

      this.tables.push(tableObj);
      this.tableSettings[element.id] = {
        colHeaders: false,
        rowHeaders: false,
        stretchH: 'all',
        wordWrap: true,
        colWidths: 100,
        viewportColumnRenderingOffset: 1000,
        viewportRowRenderingOffset: 1000,
        observeChanges: true,
        hotId: 'element.id',
        allowInvalid: true,
        validator: (value, callback) => {
          if (/^(\d+[-+*/^%])*\d+$/.test(value)) {
            callback(true);
          } else {
            callback(false);
          }
        },
        afterValidate: (core, isValid, value, row, prop, source) => {
          this.validInputCell = isValid;
          if (value === '') {
            this.validInputCell = true;
          }
        },
        renderer(instance, td, row, col, prop, value, cellProperties) {
          if ((tableObj.numberCols > 1 && col === tableObj.numberCols - 1) ||
            (tableObj.numberRows > 1 && row === tableObj.numberRows - 1)) {
            td.style.fontWeight = 'bold';
          }
          if (saveMode && (value === null || value === '')) {
            td.style.background = '#d9534f';
            td.innerHTML = value;
          }
          if (typeof value === 'number') {
            const newValue = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
            td.innerHTML = newValue;
          } else if (!/^(\d+[-+*/^%])*\d+$/.test(value) && !cellProperties.readOnly && value !== null) {
            td.style.background = '#d9534f';
            td.innerHTML = value;
          } else if (typeof value === 'string') {
            td.style.color = 'black';
            td.style.background = '#eee';
            if (value.length > 70) {
              td.innerHTML = '<div class="truncate">' + value + '</div>';
            } else {
              td.innerHTML = value;
            }
          } else {
            td.innerHTML = value;
          }
        },
        // updates the inputForm everytime we change something in the table
        beforeChange: (changes) => {
          if (changes !== null) {
            for (let i = 0; i < changes.length; i += 1) {
              const change = changes[i];
              const x = change[0];
              const y = change[1];
              const oldValue = change[2] === null ? null : +change[2];
              if (change[3] === '') {
                change[3] = null;
              }

              let newValue;
              try {
                newValue = this.expressionParser.evaluate(change[3]);
              } catch (e) {
                newValue = change[3];
              }
              if (oldValue !== newValue) {
                const pos = this.isInputCell(-1, x, y, tableObj);
                if (pos !== null && (newValue === null || typeof newValue === 'number')){
                  change[3] = newValue;
                  this.inputForm.get('values').get(element.id).get(`${pos}`).setValue(newValue);
                }
              } else {
                // dont apply this change
                changes[i] = null;
              }
            }
          }
        },

        cells: (row, col) => {
          const cellProperties = { currentColClassName: 'currentColumn', };
          if (this.isInputCell(-1, row, col, tableObj) !== null) {
            cellProperties['readOnly'] = false;
            // Add here other cells properties if you want to change the type of the cell or anything else
          } else {
            cellProperties['readOnly'] = true;
          }

          if (this.isLabelCell(-1, row, col, tableObj)) {
            cellProperties['className'] = 'hot-header-cell';
          } else {
            cellProperties['className'] = 'hot-input-cell';
            cellProperties['validator'] = /^(\d+[-+*/^%])*\d+$/;
          }

          return cellProperties;
        }
      };
    }
  }

  fillValues(element, tableObj) {
    for (let x = 0; x < tableObj.numberRows; x += 1) {
      for (let y = 0; y < tableObj.numberCols; y += 1) {
        const pos = this.isInputCell(-1, x, y, tableObj);
        if (pos !== null) {
          tableObj.value[x][y] = this.inputForm.get('values').get(element.id).get(`${pos}`).value;
        }
      }
    }
    return tableObj;
  }

  fillTotalLabels(rows: any[], cols: any[]): void {
    if (cols.length > 0) {
      const y = this.numberCols - 1;
      for (let x = 0; x < cols.length; x += 1) {
        this.table[x][y] = 'Total';
      }
    }
    if (rows.length > 0) {
      const x = this.numberRows - 1;
      for (let y = 0; y < rows.length; y += 1) {
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
    if (pos >= rows.length) { return; }
    if (pos === rows.length - 1) {
      for (const e of rows[pos].elements) {
        this.table[this.x][this.y] = e.name;
        this.x += 1;
      }
      return;
    }

    for (const e of rows[pos].elements) {
      this.table[this.x][this.y] = e.name;
      this.y += 1;

      this.fillCurrentRowLabel(rows, cols, pos + 1);
      this.y -= 1;
    }
  }

  fillCollumnLabels(rows, cols) {
    this.x = 0;
    this.y = rows.length;
    this.fillCurrentColLabel(cols, 0);
  }

  fillCurrentColLabel(cols, pos) {
    if (pos >= cols.length) { return; }
    if (pos === cols.length - 1) {
      for (const e of cols[pos].elements) {
        this.table[this.x][this.y] = e.name;
        this.y += 1;
      }
      return;
    }

    for (const e of cols[pos].elements) {
      this.table[this.x][this.y] = e.name;
      this.x += 1;
      this.fillCurrentColLabel(cols, pos + 1);
      this.x -= 1;
    }
  }


  countInputCells(variable) {
    const rows = [];
    const cols = [];

    let numberRows = 1;
    let numberCols = 1;

    let i = 0;
    for (i = 0; i < variable.distribution; i += 1) {
      rows.push(variable.partitions[i]);
      numberRows *= variable.partitions[i].elements.length;
    }
    for (i = variable.distribution; i < variable.partitions.length; i += 1) {
      cols.push(variable.partitions[i]);
      numberCols *= variable.partitions[i].elements.length;
    }

    return numberCols * numberRows;
  }

  isLabelCell(tablePos, i, j, customTable = null): boolean {
    let rows, cols;
    if (customTable === null) {
      rows = this.tables[tablePos].rows;
      cols = this.tables[tablePos].cols;
    } else {
      rows = customTable.rows;
      cols = customTable.cols;
    }

    return (i < cols.length || j < rows.length);
  }

  isInputCell(tablePos: number, i: number, j: number, customTable = null): number {
    let rows;
    let cols;
    let numberRows;
    let numberCols;

    if (customTable === null) {
      rows = this.tables[tablePos].rows;
      cols = this.tables[tablePos].cols;
      numberRows = this.tables[tablePos].numberRows;
      numberCols = this.tables[tablePos].numberCols;
    } else {
      rows = customTable.rows;
      cols = customTable.cols;
      numberRows = customTable.numberRows;
      numberCols = customTable.numberCols;
    }

    // remove the 'Total' row from the count
    if (rows.length !== 0) {
      numberRows -= 1;
    }
    // remove the 'Total' col from the count
    if (cols.length !== 0) {
      numberCols -= 1;
    }

    if (i >= cols.length && i < numberRows && j >= rows.length && j < numberCols) {
      // const nRows = numberRows - cols.length;
      const nCols = numberCols - rows.length;
      i -= cols.length;
      j -= rows.length;

      const pos = i * nCols + j;
      return pos;
    } else {
      return null;
    }
  }

  // Fill the current input with the data of the previous one
  fillWithPreviousData(): void {
    if (this.previousInput) {
      for (const e of this.form.elements) {
        if (this.previousInput && this.previousInput.values && this.previousInput.values[e.id]) {
          this.inputForm.get('values').get(e.id).setValue(this.previousInput.values[e.id]);
        }
      }
      this.createTable();
      this.updateTotals(this.inputForm.value);
    }

  }

  fillWithZero(): void {

    const dialogRef = this.dialog.open(ConfirmModalComponent, { data: { messageId: 'FillWithZeroWarning' } });

    dialogRef.afterClosed().subscribe(res => {
      if (res?.confirm) {
        for (const e of this.form.elements) {
          const newValue = [];
          // Get all the values already in the current form
          this.inputForm.get('values').get(e.id).value.forEach((val, i) => {
            if (!val) { newValue.push(0); } else { newValue.push(val); }
          });
          this.inputForm.get('values').get(e.id).setValue(newValue);
        }

        // Fill the init value with the current value in order to be able to reset
        // this.initValue = _.cloneDeep(this.inputForm) as FormGroup;
        this.createTable();
        this.updateTotals(this.inputForm.value);
      }
    });


  }

  // Save the current input and redirect the user to the input home page
  saveInput(): void {
    this.createTable(true);
    this.updateTotals(this.inputForm.value);
    if (this.inputHasNull){
      this.dialog.open(this.nullInputInfoDialog);
    }
    else{
      this.confirm();
    }
  }

  // Delete current input and redirect the user to input home page
  async deleteInput(): Promise<void> {
    const inputToBeDeleted = new Input(this.inputForm.value);
    const response = await this.inputService.delete(inputToBeDeleted);
    if (response) {
      this.router.navigate(['./../../../'], { relativeTo: this.route });
    }
  }

  // Get an input in function of the project, collection site, form and timeslot
  async getInput(): Promise<any> {
    const response = await this.inputService.get(
      this.project.id,
      this.site.id,
      this.form.id,
      this.timeSlotDate
    );
    return response;
  }

  resetInput() {
    this.inputForm = _.cloneDeep(this.initValue) as FormGroup;
    this.createTable();
    this.updateTotals(this.inputForm.value);
    this.inputForm.valueChanges.subscribe(val => {
      this.updateTotals(val);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  cancel() {
    // does nothing ???
  }

  async confirm(): Promise<void> {
    if (this.showModal) {
      const dialogRef = this.dialog.open(ConfirmModalComponent, { data: { messageId: 'DelayWarning' } });

      dialogRef.afterClosed().subscribe(res => {
        if (res?.confirm) {
          const inputToBeSaved = new Input(this.inputForm.value);
          this.inputService.save(inputToBeSaved).then(response => {
            if (response) {
              this.input = new Input(response);
              this.inputForm.get('rev').setValue(this.input.rev);
              this.router.navigate(['./../../../'], { relativeTo: this.route });
            }
          });
        }
      });
    } else {
      const inputToBeSaved = new Input(this.inputForm.value);
      this.inputService.save(inputToBeSaved).then(response => {
        if (response) {
          this.input = new Input(response);
          this.inputForm.get('rev').setValue(this.input.rev);
          this.router.navigate(['./../../../'], { relativeTo: this.route });
        }
      });
    }
  }
}
