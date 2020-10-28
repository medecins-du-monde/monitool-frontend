import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Entity } from 'src/app/models/entity.model';
import { Form } from 'src/app/models/form.model';
import { LogicalFrame } from 'src/app/models/logical-frame.model';
import { ProjectIndicator } from 'src/app/models/project-indicator.model';
import { Purpose } from 'src/app/models/purpose.model';
import { IndicatorModalComponent } from '../indicator-modal/indicator-modal.component';

@Component({
  selector: 'app-logical-frame-edit',
  templateUrl: './logical-frame-edit.component.html',
  styleUrls: ['./logical-frame-edit.component.scss']
})
export class LogicalFrameEditComponent implements OnInit, OnChanges {

  logicalFrameForm: FormGroup;

  @Input() forms: Form[];
  @Input() entities: Entity[];
  @Input() logicalFrame: LogicalFrame;
  @Output() edit = new EventEmitter();

  get selectedEntities() {
    return this.logicalFrameForm.controls.entities.value;
  }

  get purposes(): FormArray {
    return this.logicalFrameForm.controls.purposes as FormArray;
  }

  get indicators(): FormArray {
    return this.logicalFrameForm.controls.indicators as FormArray;
  }

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.setForm();
  }

  ngOnChanges(): void {
    this.setForm();
  }

  private setForm(): void {
    this.logicalFrameForm = this.fb.group({
      id: [this.logicalFrame.id],
      name: [this.logicalFrame.name, Validators.required],
      entities: [this.entities.filter(x => this.logicalFrame.entities.map(e => e.id).includes(x.id)), Validators.required],
      start: [this.logicalFrame.start],
      end: [this.logicalFrame.end],
      goal: [this.logicalFrame.goal],
      indicators: this.fb.array(this.logicalFrame.indicators),
      purposes: this.fb.array(this.logicalFrame.purposes.map(x => this.newPurpose(x)))
    });
    this.logicalFrameForm.valueChanges.subscribe((value: any) => {
      this.edit.emit(this.logicalFrame.deserialize(value));
    });
  }

  onEntityRemoved(entity: Entity) {
    const entities = this.logicalFrameForm.controls.entities.value;
    this.logicalFrameForm.controls.entities.setValue(entities.filter(x => x.id !== entity.id));
  }

  onAddNewPurpose() {
    this.purposes.push(this.newPurpose());
  }

  onRemovePurpose(i: number) {
    this.purposes.removeAt(i);
  }

  private newPurpose(purpose?: Purpose): FormGroup {
    if (!purpose) {
      purpose = new Purpose();
    }
    return this.fb.group({
      assumptions: [purpose.assumptions, Validators.required],
      description: [purpose.description, Validators.required],
      outputs: this.fb.array([]),
      indicators: this.fb.array([])
    });
  }

  onAddNewIndicator(): void {
    const indicator: FormGroup = this.newIndicator();
    this.openDialog(indicator, true);
  }

  onEditIndicator(indicator: FormGroup) {
    this.openDialog(this.newIndicator(indicator.value));
  }

  onDeleteIndicator(i: number) {
    this.indicators.removeAt(i);
  }

  private newIndicator(indicatorToEdit = null): FormGroup {
    const indicator = new ProjectIndicator(indicatorToEdit);
    return this.fb.group({
      display: [indicator.display, Validators.required],
      baseline: [indicator.baseline],
      target: [indicator.target],
      computation: this.fb.group({
        formula: [indicator.computation ? indicator.computation.formula : null],
        parameters: [indicator.computation ? indicator.computation.parameters : []]
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
