import { Component, Input, OnInit, Output } from '@angular/core';
import { Form, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ProjectIndicator } from 'src/app/models/project-indicator.model';
import { IndicatorModalComponent } from '../indicator-modal/indicator-modal.component';

@Component({
  selector: 'app-purpose-edit',
  templateUrl: './purpose-edit.component.html',
  styleUrls: ['./purpose-edit.component.scss']
})
export class PurposeEditComponent implements OnInit {

  @Input() purposeForm: FormGroup;
  @Input() forms: Form[];

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
    const indicator: FormGroup = this.newIndicator();
    this.openDialog(indicator, true);
  }

  onEditIndicator(indicator: FormGroup) {
    this.openDialog(indicator);
  }

  onDeleteIndicator(i: number) {
    this.indicators.removeAt(i);
  }

  private newIndicator(): FormGroup {
    const indicator = new ProjectIndicator();
    return this.fb.group({
      display: [indicator.display, Validators.required],
      baseline: [indicator.baseline],
      target: [indicator.target],
      computation: this.fb.group({
        formula: [indicator.computation.formula],
        parameters: [indicator.computation.formula]
      }),
      type: [indicator.type]
    });
  }

  openDialog(indicator: FormGroup, add?: boolean) {
    const dialogRef = this.dialog.open(IndicatorModalComponent, { data: { indicator, forms: this.forms } });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        if (add) {
          this.indicators.push(res.indicator);
        } else {
          indicator = res.indicator;
        }
      }
    });
  }

}
