import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  dataSource = new BehaviorSubject<string[]>([]);

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
  ) { }

  ngOnInit(): void {
    this.initValue = this.data.indicator.value;
    this.parser = new Parser();
    this.parser.consts = {};
    try {
      this.symbols = this.parser.parse(this.data.indicator.value.computation.formula).variables();
      this.dataSource.next(this.symbols);
    }
    catch (e) {
      this.symbols = [];
    }
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
    const oldSymbols = Object.keys(parameters);
    try {
      newSymbols = this.parser.parse(this.data.indicator.controls.computation.value.formula).variables();
    }
    catch (e) {
      newSymbols = [];
    }

    if (!(JSON.stringify(newSymbols) === JSON.stringify(oldSymbols))) {
      const addedSymbols = newSymbols.filter(s => !oldSymbols.includes(s));

      // Add new symbols to formula
      addedSymbols.forEach(s => {
        parameters[s] = { elementId: null, filter: {} };
      });
    }

    this.symbols = newSymbols;
    const computation = this.data.indicator.controls.computation as FormGroup;

    const paramatersFormGroup = this.fb.group({});
    const parameterGroup = this.fb.group({
      elementId: ['', Validators.required],
      filter: [{}]
    });
    for (const symbol of this.symbols) {
      paramatersFormGroup.addControl(`${symbol}`, parameterGroup);
    }

    this.data.indicator.controls.computation = this.fb.group({
      formula: computation.value.formula,
      parameters: paramatersFormGroup
    });

    this.dataSource.next(this.symbols);
  }
}
