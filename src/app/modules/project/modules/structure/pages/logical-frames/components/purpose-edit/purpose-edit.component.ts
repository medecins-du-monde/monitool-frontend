import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Form, FormArray, FormGroup } from '@angular/forms';
import * as _ from 'lodash';
import { MatDialog } from '@angular/material/dialog';
import { IndicatorModalComponent } from '../indicator-modal/indicator-modal.component';
import FormGroupBuilder from 'src/app/utils/form-group-builder';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-purpose-edit',
  templateUrl: './purpose-edit.component.html',
  styleUrls: ['./purpose-edit.component.scss']
})
export class PurposeEditComponent implements OnInit {

  @Input() purposeForm: FormGroup;
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
    private changeDetector: ChangeDetectorRef
  ) { }

  ngOnInit(): void {}

  onAddNewOutput() {
    this.outputs.push(FormGroupBuilder.newOutput());
  }

  onRemoveOutput(i: number) {
    this.outputs.removeAt(i);
  }

  onAddNewIndicator(): void {
    this.openDialog(FormGroupBuilder.newIndicator(), true);
  }

  onEditIndicator(indicator: FormGroup, index?: number) {
    this.openDialog(FormGroupBuilder.newIndicator(indicator.value), false, index);
  }

  onDeleteIndicator(i: number) {
    this.indicators.removeAt(i);
  }

  openDialog(indicator: FormGroup, add?: boolean, index?: number) {
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

  // drag and drop function on a form array displayed in one column
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.outputs.controls, event.previousIndex, event.currentIndex);
    // Dummy code so the save button is available
    const control = this.outputs.at(0);
    this.outputs.setControl(0, control);
  }

  // drag and drop function on a form array that can span accross multiple rows
  dropIndicators(event: CdkDragDrop<any>) {
    moveItemInArray(this.indicators.controls, event.previousContainer.data.index, event.container.data.index);
    // Dummy code so the save button is available
    const control = this.indicators.at(0);
    this.indicators.setControl(0, control);
  }

}
