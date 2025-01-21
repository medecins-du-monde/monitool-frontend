import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { UntypedFormGroup, Form, UntypedFormArray } from '@angular/forms';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { IndicatorModalComponent } from '../indicator-modal/indicator-modal.component';
import FormGroupBuilder from 'src/app/utils/form-group-builder';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-activity-edit',
  templateUrl: './activity-edit.component.html',
  styleUrls: ['./activity-edit.component.scss']
})
export class ActivityEditComponent {

  @Input() activityForm: UntypedFormGroup;
  @Input() forms: Form[];

  get indicators(): UntypedFormArray {
    return this.activityForm.controls.indicators as UntypedFormArray;
  }

  constructor(
    private dialog: MatDialog,
    private changeDetector: ChangeDetectorRef
  ) { }

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
  drop(event: CdkDragDrop<any>) {
    moveItemInArray(this.indicators.controls, event.previousContainer.data.index, event.container.data.index);
    // Dummy code so the save button is available
    const control = this.indicators.at(0);
    this.indicators.setControl(0, control);
  }

}
