import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Parser } from 'expr-eval';
import { forEach } from 'lodash';
import { BehaviorSubject } from 'rxjs';
import { Form } from 'src/app/models/form.model';
import { COPY_FORMULA, PERCENTAGE_FORMULA, PERMILLE_FORMULA } from 'src/app/models/project-indicator.model';

@Component({
  selector: 'app-indicator-modal',
  templateUrl: './indicator-modal.component.html',
  styleUrls: ['./indicator-modal.component.scss']
})
export class IndicatorModalComponent implements OnInit {

  displayedColumns: string[] = ['parameter', 'variable', 'disaggregations'];
  dataSource = new BehaviorSubject<any[]>([]);

  private initValue: any;
  private parser: Parser;
  private symbols: any;

  public computationTypes = [
    {
      value: 'unavailable',
      display: 'Enum.Computation.unavailable'
    },
    {
      value: 'fixed',
      display: 'Enum.Computation.fixed'
    },
    {
      value: 'copy',
      display: 'Enum.Computation.copy'
    },
    {
      value: 'percentage',
      display: 'Enum.Computation.percentage'
    },
    {
      value: 'permille',
      display: 'Enum.Computation.permille'
    },
    {
      value: 'formula',
      display: 'Enum.Computation.formula'
    },
  ];

  get type() {
    return this.data.indicator.value.type;
  }

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<IndicatorModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { indicator: FormGroup, forms: Form[] }
  ) {}


  ngOnInit(): void {
    const computation = this.data.indicator.controls.computation as FormGroup;

    const parameterGroup = this.fb.group({
      elementId: ['', Validators.required],
      filter: this.fb.group({}),
    });

    const parametersFormGroup = this.fb.group({});

    this.initValue = this.data.indicator.value;
    this.parser = new Parser();
    this.parser.consts = {};
    try {
      this.symbols = this.parser.parse(this.data.indicator.value.computation.formula).variables();

      const newDataSource = [];
      forEach(this.symbols, symbol => {
        parametersFormGroup.addControl(symbol, parameterGroup);
        newDataSource.push({
        symbol,
      });
    });
      this.dataSource.next(newDataSource);
    }
    catch (e) {
      this.symbols = [];
    }
    this.data.indicator.controls.computation = this.fb.group({
      formula: computation.value.formula,
      parameters: parametersFormGroup,
    });
  }

  onSubmit() {
    this.dialogRef.close({ indicator: this.data.indicator });
  }

  onReset() {
    this.data.indicator.setValue(this.initValue);
  }

  onTypeChange(type: any) {
    const computation = this.data.indicator.controls.computation as FormGroup;

    if (type.value === 'fixed' && isNaN(computation.value.formula)) {
      computation.controls.formula.setValue('0');
    } else if (type.value === 'copy') {
      computation.controls.formula.setValue(COPY_FORMULA);
    } else if (type.value === 'percentage') {
      computation.controls.formula.setValue(PERCENTAGE_FORMULA);
    } else if (type.value === 'permille') {
      computation.controls.formula.setValue(PERMILLE_FORMULA);
    }
    this.onFormulaChange();
  }

  onFormulaChange() {
    const parameters = this.data.indicator.controls.computation.value.parameters ?
      this.data.indicator.controls.computation.value.parameters : {};
    let newSymbols = Object.keys(parameters);
    // const oldSymbols = Object.keys(parameters);
    try {
      newSymbols = this.parser.parse(this.data.indicator.controls.computation.value.formula).variables();
    }
    catch (e) {
      newSymbols = [];
    }

    // if (!(JSON.stringify(newSymbols) === JSON.stringify(oldSymbols))) {
    //   const addedSymbols = newSymbols.filter(s => !oldSymbols.includes(s));

    //   // Add new symbols to formula
    //   addedSymbols.forEach(s => {
    //     parameters[s] = { elementId: null, filter: {} };
    //   });
    // }

    this.symbols = newSymbols;
    const computation = this.data.indicator.controls.computation as FormGroup;

    const parametersFormGroup = this.fb.group({});

    forEach( this.symbols, symbol => {
      parametersFormGroup.addControl(`${symbol}`, this.fb.group({
        elementId: ['', Validators.required],
        filter: this.fb.group({}),
      }));
    });

    this.data.indicator.controls.computation = this.fb.group({
      formula: computation.value.formula,
      parameters: parametersFormGroup,
    });
    const newDataSource = [];
    console.log('data.form');
    console.log(this.data.forms);
    forEach(this.symbols, symbol => {
      newDataSource.push({
        symbol,
      });
    });
    this.dataSource.next(newDataSource);
    console.log('Here is the datasource : ');
    console.log(this.dataSource.getValue());
    console.log('Here is teh computation');
    console.log(this.data.indicator.controls.computation);
  }

  onVariableSelected(event, element) {
    console.log('onVariableSelected...');
    console.log(this.data.indicator.controls.computation.value.parameters);
    console.log('here is the event :');
    console.log(event);
    console.log('Here is the element : ');
    console.log(element);
    const newDataSource = this.dataSource.getValue();
    console.log('old datasource : ')
    console.log(newDataSource)
    forEach(newDataSource, data => {
      if (data.symbol === element.symbol ) {
        data.filter = this.data.forms[0].elements.filter(partitionData => partitionData.id === event.value)[0];
        this.data.indicator.controls.computation
        .get('parameters')
        .get(`${data.symbol}`)
        .get('elementId')
        .setValue(data.filter ? data.filter.id : '');
      }
      console.log('this.data.indicator.controls.computation.get(parameters) :');
      console.log(this.data.indicator.controls.computation.get('parameters').get(`${data.symbol}`));

      console.log('data : ');
      console.log(data);



      console.log('Here is the newDataSource :');
      console.log(newDataSource);
      console.log('new computation parameters');
      console.log(this.data.indicator.controls.computation.get('parameters'));
    });

    this.dataSource.next(newDataSource);
  }

  getPartitions() {
    console.log('getPartitions...');
    console.log(this.data.indicator.controls.computation);
  }
}
