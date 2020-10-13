import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Activity } from 'src/app/models/activity.model';
import { Form } from 'src/app/models/form.model';
import { ProjectIndicator } from 'src/app/models/project-indicator.model';
import { IndicatorModalComponent } from '../indicator-modal/indicator-modal.component';

@Component({
  selector: 'app-output-edit',
  templateUrl: './output-edit.component.html',
  styleUrls: ['./output-edit.component.scss']
})
export class OutputEditComponent implements OnInit {

  @Input() outputForm: FormGroup;
  @Input() forms: Form[];

  get activities(): FormArray {
    return this.outputForm.controls.activities as FormArray;
  }

  get indicators(): FormArray {
    return this.outputForm.controls.indicators as FormArray;
  }

  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {}

  onAddNewActivity() {
    this.activities.push(this.newActivity());
  }

  onRemoveActivity(i: number) {
    this.activities.removeAt(i);
  }

  private newActivity(): FormGroup {
    const activity = new Activity();
    return this.fb.group({
      description: [activity.description, Validators.required],
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
