import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import * as _ from 'lodash';
import { forEach } from 'lodash';
import { Entity } from 'src/app/models/entity.model';
import { Form } from 'src/app/models/form.model';
import { LogicalFrame } from 'src/app/models/logical-frame.model';
import { ProjectIndicator } from 'src/app/models/project-indicator.model';
import { Purpose } from 'src/app/models/purpose.model';
import { PartitionElement } from 'src/app/models/partition-element.model';
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

  onEditPurpose(purpose: Purpose, index: number) {
    this.purposes.setControl(index, _.cloneDeep(this.newPurpose(purpose)));
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
      outputs: this.fb.array(purpose.outputs),
      indicators: this.fb.array(purpose.indicators.map(x => this.newIndicator(x))),
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

  // TODO : Check if could be used in the line 61 to not have to use it in the indicator modal after
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
