import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Form, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { forEach } from 'lodash';
import * as _ from 'lodash';
import { MatDialog } from '@angular/material/dialog';
import { ProjectIndicator } from 'src/app/models/project-indicator.model';
import { Purpose } from 'src/app/models/purpose.model';
import { IndicatorModalComponent } from '../indicator-modal/indicator-modal.component';

@Component({
  selector: 'app-purpose-edit',
  templateUrl: './purpose-edit.component.html',
  styleUrls: ['./purpose-edit.component.scss']
})
export class PurposeEditComponent implements OnInit {

  purposeForm: FormGroup;

  @Input() purpose: Purpose;
  @Input() forms: Form[];
  @Output() edit = new EventEmitter();

  get outputs(): FormArray {
    return this.purposeForm.controls.outputs as FormArray;
  }

  get indicators(): FormArray {
    return this.purposeForm.controls.indicators as FormArray;
  }

  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.setForm();
  }

  private setForm(): void {
    this.purposeForm = this.fb.group({
      assumptions: [this.purpose.assumptions],
      description: [this.purpose.description],
      indicators: this.fb.array(this.purpose.indicators.map(x => this.newIndicator(x))),
      outputs: this.fb.array(this.purpose.outputs.map(x => this.newOutput())),
    });
  }

  onFocusOut(event) {
    //TODO: Review this focusout
    if (event.relatedTarget === null) {
      this.purpose = new Purpose(this.purpose);
      this.edit.emit(this.purpose.deserialize(this.purposeForm.value));
    }
  }
  onAddNewOutput() {
    this.outputs.push(this.newOutput());
  }

  onRemoveOutput(i: number) {
    this.outputs.removeAt(i);
  }

  private newOutput(): FormGroup {
    const output = new Output();
    return this.fb.group({
      assumptions: [output.assumptions, Validators.required],
      description: [output.description, Validators.required],
      activities: this.fb.array([]),
      indicators: this.fb.array([])
    });
  }

  onAddNewIndicator(): void {
    this.openDialog(this.newIndicator(), true);
  }

  onEditIndicator(indicator: FormGroup, index?: number) {
    this.openDialog(this.newIndicator(indicator.value), false, index);
  }

  onDeleteIndicator(i: number) {
    this.indicators.removeAt(i);
  }

  private newIndicator(indicatorToEdit = null): FormGroup {
    const indicator = new ProjectIndicator(indicatorToEdit);

    const parametersFormGroup = new FormGroup({});

    if (indicator.computation) {
      forEach(indicator.computation.parameters, (parameter, key) => {
        const filterGroup = this.fb.group({});
        // tslint:disable-next-line: no-string-literal
        forEach(parameter['filter'], (filterValue: string[], keyFilter: string) => {
        filterGroup.addControl(`${keyFilter}`, new FormControl(filterValue)); });
        parametersFormGroup.addControl(`${key}`, this.fb.group({

          // tslint:disable-next-line: no-string-literal
          elementId: [parameter['elementId']],
          filter: filterGroup as FormGroup,
        }));
      });
    }
    return this.fb.group({
      display: [indicator.display, Validators.required],
      baseline: [indicator.baseline, Validators.required],
      target: [indicator.target, Validators.required],
      computation: this.fb.group({
        formula: [indicator.computation ? indicator.computation.formula : null],
        parameters: indicator.computation ? _.cloneDeep(parametersFormGroup) as FormGroup : this.fb.group({}),
      }),
      type: [indicator.type]
    });
  }

  openDialog(indicator: FormGroup, add?: boolean, index?: number) {
    const dialogRef = this.dialog.open(IndicatorModalComponent, { data: { indicator, forms: this.forms } });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        if (add) {
          this.indicators.push(res.indicator);
        }
        else if (index !== null) {
          this.indicators.setControl(index, res.indicator);
        }
      }
    });
  }

}
