import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Form, FormArray, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ProjectIndicator } from 'src/app/models/project-indicator.model';
import { IndicatorModalComponent } from '../indicator-modal/indicator-modal.component';

@Component({
  selector: 'app-activity-edit',
  templateUrl: './activity-edit.component.html',
  styleUrls: ['./activity-edit.component.scss']
})
export class ActivityEditComponent implements OnInit {

  @Input() activityForm: FormGroup;
  @Input() forms: Form[];

  get indicators(): FormArray {
    return this.activityForm.controls.indicators as FormArray;
  }

  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
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
