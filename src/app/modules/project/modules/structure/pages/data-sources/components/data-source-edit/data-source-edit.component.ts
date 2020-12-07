import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Entity } from 'src/app/models/entity.model';
import { FormElement } from 'src/app/models/form-element.model';
import { Form } from 'src/app/models/form.model';
import { PartitionElement } from 'src/app/models/partition-element.model';
import { PartitionGroup } from 'src/app/models/partition-group.model';
import { Partition } from 'src/app/models/partition.model';
import { Project } from 'src/app/models/project.model';
import Dates from 'src/app/utils/dates';
import { TimeSlotPeriodicity } from 'src/app/utils/time-slot-periodicity';


@Component({
  selector: 'app-data-source-edit',
  templateUrl: './data-source-edit.component.html',
  styleUrls: ['./data-source-edit.component.scss']
})
export class DataSourceEditComponent implements OnInit, OnChanges {

  dataSourceForm: FormGroup;
  startDate: Date;
  endDate: Date;
  changedStartDate = false;
  changedEndDate = false;

  @Input() entities: Entity[];
  @Input() form: Form;
  @Input() project: Project;
  @Output() edit = new EventEmitter();

  public periodicities = [];
  get selectedEntities() {
    return this.dataSourceForm.controls.entities.value;
  }

  get elements(): FormArray {
    return this.dataSourceForm.controls.elements as FormArray;
  }

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.setForm();

    for (const value of Object.values(TimeSlotPeriodicity)){
      this.periodicities.push({
        value,
        display: `Enum.Periodicity.${value}`
      });
    }
  }

  ngOnChanges(): void {
    this.setForm();
  }

  private setForm(): void {
    this.dataSourceForm = this.fb.group({
      id: [this.form.id],
      name: [this.form.name, Validators.required],
      entities: [this.entities.filter(x => this.form.entities.map(e => e.id).includes(x.id)), Validators.required],
      periodicity: [this.form.periodicity, Validators.required],
      start: [this.form.start, Validators.required],
      end: [this.form.end, Validators.required],
      elements: this.fb.array(this.form.elements.map(x => this.newElement(x)))
    });
    this.dataSourceForm.valueChanges.subscribe((value: any) => {
      this.changedStartDate = !Dates.areEquals(new Date(value.start), new Date(this.project.start));
      this.changedEndDate = !Dates.areEquals(new Date(value.end), new Date(this.project.end));
      this.edit.emit(this.form.deserialize(value));
    });
    if (this.form.start) { this.changedStartDate = !Dates.areEquals(new Date(this.form.start), new Date(this.project.start)); }
    if (this.form.end) { this.changedEndDate = !Dates.areEquals(new Date(this.form.end), new Date(this.project.end)); }
  }

  onEntityRemoved(entity: Entity) {
    const entities = this.dataSourceForm.controls.entities.value;
    this.dataSourceForm.controls.entities.setValue(entities.filter(x => x.id !== entity.id));
  }

  onAddNewElement() {
    this.elements.push(this.newElement());
  }

  onRemoveElement(i: number) {
    this.elements.removeAt(i);
  }

  private newElement(element?: FormElement): FormGroup {
    if (!element) {
      element = new FormElement();
    }
    return this.fb.group({
      id: [element.id],
      name: [element.name, Validators.required],
      partitions: this.fb.array(element.partitions.map(x => this.newPartition(x))),
      distribution: [element.distribution],
      geoAgg: [element.geoAgg],
      timeAgg: [element.timeAgg]
    });
  }

  private newPartition(partition: Partition): FormGroup {
    const partitionForm = this.fb.group({
      id: [partition.id],
      name: [partition.name, Validators.required],
      aggregation: [partition.aggregation],
      elements: this.fb.array(partition.elements.map(x => this.newPartitionElement(x))),
      useGroups: [partition.useGroups]
    });
    const elements = partitionForm.controls.elements as FormArray;
    partitionForm.addControl('groups', this.fb.array(
      partition.useGroups ? partition.groups.map(x => this.newPartitionGroup(x, elements)) : []));
    return partitionForm;
  }

  private newPartitionElement(partitionElement: PartitionElement): FormGroup {
    return this.fb.group({
      id: [partitionElement.id],
      name: [partitionElement.name, Validators.required]
    });
  }

  private newPartitionGroup(partitionGroup: PartitionGroup, elements: FormArray): FormGroup {
    return this.fb.group({
      id: [partitionGroup.id],
      name: [partitionGroup.name, Validators.required],
      members: [elements.value.filter(x => partitionGroup.members.map(m => m.id).includes(x.id))]
    });
  }
}