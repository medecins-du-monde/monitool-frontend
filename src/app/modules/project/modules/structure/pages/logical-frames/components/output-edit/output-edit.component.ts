import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { UntypedFormGroup, UntypedFormArray, UntypedFormBuilder } from '@angular/forms';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import * as _ from 'lodash';
import { Form } from 'src/app/models/classes/form.model';
import { IndicatorModalComponent } from '../indicator-modal/indicator-modal.component';
import FormGroupBuilder from 'src/app/utils/form-group-builder';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-output-edit',
  templateUrl: './output-edit.component.html',
  styleUrls: ['./output-edit.component.scss']
})
export class OutputEditComponent {

  @Input() outputForm: UntypedFormGroup;
  @Input() forms: Form[];

  get activities(): UntypedFormArray {
    return this.outputForm.controls.activities as UntypedFormArray;
  }

  get indicators(): UntypedFormArray {
    return this.outputForm.controls.indicators as UntypedFormArray;
  }

  constructor(
    private dialog: MatDialog,
    private fb: UntypedFormBuilder,
    private changeDetector: ChangeDetectorRef
  ) { }

  onAddNewActivity() {
    this.activities.push(FormGroupBuilder.newActivity());
  }

  onRemoveActivity(i: number) {
    this.activities.removeAt(i);
  }

  onAddNewIndicator(): void {
    const indicator: UntypedFormGroup = FormGroupBuilder.newIndicator();
    this.openDialog(indicator, true);
  }

  onEditIndicator(indicator: UntypedFormGroup, index?: number) {
    this.openDialog(FormGroupBuilder.newIndicator(indicator.value), false, index);
  }

  onDeleteIndicator(i: number) {
    this.indicators.removeAt(i);
  }

  openDialog(indicator: UntypedFormGroup, add?: boolean, index?: number) {
    const dialogRef = this.dialog.open(IndicatorModalComponent, { data: { indicator, forms: this.forms } });

    const dialogSubscription = dialogRef.afterClosed().subscribe(res => {
      if (res) {
        if (add) {
          this.indicators.push(res.indicator);
        }
        else if (index !== null) {
          this.indicators.setControl(index, res.indicator);
        }
        dialogSubscription.unsubscribe();
      }
      this.changeDetector.markForCheck();
    });
  }

  // drag and drop function on a form array that can span accross multiple rows
  dropIndicators(event: CdkDragDrop<any>) {
    moveItemInArray(this.indicators.controls, event.previousContainer.data.index, event.container.data.index);
    // Dummy code so the save button is available
    const control = this.indicators.at(0);
    this.indicators.setControl(0, control);
  }

  // drag and drop function on a form array displayed in one column
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.activities.controls, event.previousIndex, event.currentIndex);
    // Dummy code so the save button is available
    const control = this.activities.at(0);
    this.activities.setControl(0, control);
  }
}
