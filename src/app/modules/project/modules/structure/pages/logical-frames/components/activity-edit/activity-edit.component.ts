import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormGroup, Form, FormArray } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { IndicatorModalComponent } from '../indicator-modal/indicator-modal.component';
import FormGroupBuilder from 'src/app/utils/form-group-builder';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

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
    private changeDetector: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
  }

  onAddNewIndicator(): void {
    const indicator: FormGroup = FormGroupBuilder.newIndicator();
    this.openDialog(indicator, true);
  }

  onEditIndicator(indicator: FormGroup, index?: number) {
    this.openDialog(FormGroupBuilder.newIndicator(indicator.value), false, index);
  }

  onDeleteIndicator(i: number) {
    this.indicators.removeAt(i);
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
      this.changeDetector.markForCheck();
    });
  }

  // drag and drop function on a form array that can span accross multiple rows
  drop(event: CdkDragDrop<any>) {
    moveItemInArray(this.indicators.controls, event.previousContainer.data.index, event.container.data.index);
    // Dummy code so the save button is available
    const control = this.indicators.at(0);
    this.indicators.setControl(0, control);
  }

}
