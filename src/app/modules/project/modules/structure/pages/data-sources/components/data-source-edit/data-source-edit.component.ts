import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Entity } from 'src/app/models/entity.model';
import { FormElement } from 'src/app/models/form-element.model';
import { Form } from 'src/app/models/form.model';
import { PartitionElement } from 'src/app/models/partition-element.model';
import { PartitionGroup } from 'src/app/models/partition-group.model';
import { Partition } from 'src/app/models/partition.model';
import { Project } from 'src/app/models/project.model';

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

  public periodicities = [
    {
      value: 'day',
      display: 'Enum.Periodicity.day'
    },
    {
      value: 'month_week_sat',
      display: 'Enum.Periodicity.month_week_sat'
    },
    {
      value: 'month_week_sun',
      display: 'Enum.Periodicity.month_week_sun'
    },
    {
      value: 'month_week_mon',
      display: 'Enum.Periodicity.month_week_mon'
    },
    {
      value: 'week_sat',
      display: 'Enum.Periodicity.week_sat'
    },
    {
      value: 'week_sun',
      display: 'Enum.Periodicity.week_sun'
    },
    {
      value: 'week_mon',
      display: 'Enum.Periodicity.week_mon'
    },
    {
      value: 'month',
      display: 'Enum.Periodicity.month'
    },
    {
      value: 'quarter',
      display: 'Enum.Periodicity.quarter'
    },
    {
      value: 'semester',
      display: 'Enum.Periodicity.semester'
    },
    {
      value: 'year',
      display: 'Enum.Periodicity.year'
    },
    {
      value: 'free',
      display: 'Enum.Periodicity.free'
    }
  ];

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
    this.startDate = this.project.start;
    this.endDate = this.project.end
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
      start: [this.form.start],
      end: [this.form.end],
      elements: this.fb.array(this.form.elements.map(x => this.newElement(x)))
    });
    this.dataSourceForm.valueChanges.subscribe((value: any) => {
      this.edit.emit(this.form.deserialize(value));
    });
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

  dateTransform(date) {
    const isoDate = new Date(date);
    return isoDate;
  }

  changeStartDate(event) {
    this.startDate = event.value;
    this.changedStartDate = true;
  }

  changeEndDate(event) {
    this.endDate = event.value;
    this.changedEndDate = true;
  }

}
