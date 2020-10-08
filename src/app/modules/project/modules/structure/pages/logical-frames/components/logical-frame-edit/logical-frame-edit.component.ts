import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Entity } from 'src/app/models/entity.model';
import { LogicalFrame } from 'src/app/models/logical-frame.model';
import { Purpose } from 'src/app/models/purpose.model';

@Component({
  selector: 'app-logical-frame-edit',
  templateUrl: './logical-frame-edit.component.html',
  styleUrls: ['./logical-frame-edit.component.scss']
})
export class LogicalFrameEditComponent implements OnInit, OnChanges {

  logicalFrameForm: FormGroup;

  @Input() entities: Entity[];
  @Input() logicalFrame: LogicalFrame;
  @Output() edit = new EventEmitter();

  get selectedEntities() {
    return this.logicalFrameForm.controls.entities.value;
  }

  get purposes(): FormArray {
    return this.logicalFrameForm.controls.purposes as FormArray;
  }

  constructor(
    private fb: FormBuilder
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
      assumptions: [purpose.assumtions, Validators.required],
      description: [purpose.description, Validators.required],
      outputs: this.fb.array([])
    });
  }

}
