import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import * as _ from 'lodash';
import { Entity } from 'src/app/models/classes/entity.model';
import { LogicalFrame } from 'src/app/models/classes/logical-frame.model';
import { Project } from 'src/app/models/classes/project.model';
import { Purpose } from 'src/app/models/classes/purpose.model';
import { IndicatorModalComponent } from '../indicator-modal/indicator-modal.component';
import { ProjectService } from 'src/app/services/project.service';
import DatesHelper from 'src/app/utils/dates-helper';
import FormGroupBuilder from 'src/app/utils/form-group-builder';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-logical-frame-edit',
  templateUrl: './logical-frame-edit.component.html',
  styleUrls: ['./logical-frame-edit.component.scss']
})
export class LogicalFrameEditComponent implements OnInit, OnChanges {

  logicalFrameForm: FormGroup;

  @Input() project: Project;
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
    private dialog: MatDialog,
    private projectService: ProjectService,
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
      start: [this.logicalFrame.start, Validators.required],
      end: [this.logicalFrame.end, Validators.required],
      goal: [this.logicalFrame.goal, Validators.required],
      indicators: this.fb.array(this.logicalFrame.indicators.map(x => FormGroupBuilder.newIndicator(x))),
      purposes: this.fb.array(this.logicalFrame.purposes.map(x => FormGroupBuilder.newPurpose(x)))
    });
    this.logicalFrameForm.valueChanges.subscribe((value: any) => {
      this.projectService.valid = this.logicalFrameForm.valid;
      this.edit.emit(this.logicalFrame.deserialize(value));
    });
  }

  toggleCustomDate(event: any, selected: string): void {
    if (event.value === 'false') {
      this.logicalFrameForm.get(selected).setValue(this.project[selected]);
    }
    else {
      this.logicalFrameForm.get(selected).setValue(null);
    }
  }

  isCustom(selected: string): boolean {
    return !DatesHelper.areEquals(new Date(this.logicalFrameForm.get(selected).value), new Date(this.project[selected]));
  }

  onEntityRemoved(entity: Entity): void {
    const entities = this.logicalFrameForm.controls.entities.value;
    this.logicalFrameForm.controls.entities.setValue(entities.filter(x => x.id !== entity.id));
  }

  onAddNewPurpose(): void {
    this.purposes.push(FormGroupBuilder.newPurpose());
  }

  onEditPurpose(purpose: Purpose, index: number): void {
    this.purposes.setControl(index, _.cloneDeep(FormGroupBuilder.newPurpose(purpose)));
  }

  onRemovePurpose(i: number): void {
    this.purposes.removeAt(i);
  }

  onAddNewIndicator(): void {
    this.openDialog(FormGroupBuilder.newIndicator(), true);
  }

  onEditIndicator(indicator: FormGroup, index?: number): void {
    this.openDialog(FormGroupBuilder.newIndicator(indicator.value), false, index);
  }

  onDeleteIndicator(i: number): void {
    this.indicators.removeAt(i);
  }

  openDialog(indicator: FormGroup, add?: boolean, index?: number): void {
    const dialogRef = this.dialog.open(IndicatorModalComponent, { data: { indicator, forms: this.project.forms } });

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

  drop(event: CdkDragDrop<string[]>) {
    const selectedControl = this.purposes.at(event.previousIndex);
    const newControls = this.purposes.at(event.currentIndex);
    this.purposes.setControl(event.previousIndex, newControls);
    this.purposes.setControl(event.currentIndex, selectedControl);
  }

  dropIndicators(event: CdkDragDrop<any>) {
    this.indicators.setControl(event.previousContainer.data.index, event.container.data.indicator);
    this.indicators.setControl(event.container.data.index, event.previousContainer.data.indicator);
  }

}
