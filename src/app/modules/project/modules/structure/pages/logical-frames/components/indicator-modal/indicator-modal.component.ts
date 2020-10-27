import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Parser } from 'expr-eval';
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
      this.symbols.forEach(symbol => {
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

    try {
      newSymbols = this.parser.parse(this.data.indicator.controls.computation.value.formula).variables();
    }
    catch (e) {
      newSymbols = [];
    }

    this.symbols = newSymbols;
    const computation = this.data.indicator.controls.computation as FormGroup;

    const parametersFormGroup = this.fb.group({});

    this.symbols.forEach(symbol => {
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
    this.symbols.forEach(symbol => {
      newDataSource.push({
        symbol,
      });
    });
    this.dataSource.next(newDataSource);
  }

  onVariableSelected(event, element) {
    const newDataSource = this.dataSource.getValue();
    newDataSource.forEach(data => {
      if (data.symbol === element.symbol ) {
        data.filter = this.data.forms[0].elements.filter(partitionData => partitionData.id === event.value)[0];
        data.filter.partitions.forEach(partition => {
          const filter = this.data.indicator.controls.computation
          .get('parameters')
          .get(`${data.symbol}`)
          .get('filter') as FormGroup;
          filter.addControl(`${partition.id}`, new FormControl([]));
        });
      }
    });

    this.dataSource.next(newDataSource);
  }

  getPartitions(symbol, partitionId) {
    return this.data.indicator.controls.computation
      .get('parameters')
      .get(`${symbol}`)
      .get('filter')
      .get(`${partitionId}`).value
      ;
  }

  onPartitionElementRemoved(symbol, partitionId, partitionElementId) {
    const partition = this.data.indicator.controls.computation
    .get('parameters')
    .get(`${symbol}`)
    .get('filter')
    .get(`${partitionId}`).value
    ;
    this.data.indicator.controls.computation
    .get('parameters')
    .get(`${symbol}`)
    .get('filter').get(`${partitionId}`).setValue(partition.filter(p => p.id !== partitionElementId));
  }
}
