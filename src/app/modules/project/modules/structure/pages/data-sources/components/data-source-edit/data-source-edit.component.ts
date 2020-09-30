import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Entity } from 'src/app/models/entity.model';
import { FormElement } from 'src/app/models/form-element.model';
import { Form } from 'src/app/models/form.model';
import { Partition } from 'src/app/models/partition.model';

@Component({
  selector: 'app-data-source-edit',
  templateUrl: './data-source-edit.component.html',
  styleUrls: ['./data-source-edit.component.scss']
})
export class DataSourceEditComponent implements OnInit {

  dataSourceForm: FormGroup;

  @Input() entities: Entity[];
  @Input() form: Form;
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
    return this.dataSourceForm ? this.entities.filter(x => this.dataSourceForm.controls.entities.value.includes(x.id)) : [];
  }

  get elements(): FormArray {
    return this.dataSourceForm.controls.elements as FormArray;
  }

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.dataSourceForm = this.fb.group({
      name: [this.form.name, Validators.required],
      entities: [this.form.entities.map(x => x.id), Validators.required],
      periodicity: [this.form.periodicity, Validators.required],
      start: [this.form.start],
      end: [this.form.end],
      elements: this.fb.array(this.form.elements.map(x => this.newElement(x)))
    });
    this.dataSourceForm.valueChanges.subscribe((value: any) => {
      const selectedEntities = value.entities;
      value.entities = this.entities.filter(x => selectedEntities.includes(x.id));
      this.edit.emit(Object.assign(this.form, value));
    });
  }

  onEntityRemoved(entity: Entity) {
    const entities = this.dataSourceForm.controls.themes.value;
    this.dataSourceForm.controls.entities.setValue(entities.filter(t => t !== entity.id));
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
    return this.fb.group({
      id: [partition.id],
      name: [partition.name, Validators.required],
      aggregation: [partition.aggregation],
      elements: this.fb.array([]),
      groups: this.fb.array([])
    });
  }

}
