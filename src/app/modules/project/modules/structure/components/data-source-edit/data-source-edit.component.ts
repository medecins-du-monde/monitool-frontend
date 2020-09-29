import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Entity } from 'src/app/models/entity.model';
import { Form } from 'src/app/models/form.model';

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
      display: 'Periodicity.day'
    },
    {
      value: 'month_week_sat',
      display: 'Periodicity.month_week_sat'
    },
    {
      value: 'month_week_sun',
      display: 'Periodicity.month_week_sun'
    },
    {
      value: 'month_week_mon',
      display: 'Periodicity.month_week_mon'
    },
    {
      value: 'week_sat',
      display: 'Periodicity.week_sat'
    },
    {
      value: 'week_sun',
      display: 'Periodicity.week_sun'
    },
    {
      value: 'week_mon',
      display: 'Periodicity.week_mon'
    },
    {
      value: 'month',
      display: 'Periodicity.month'
    },
    {
      value: 'quarter',
      display: 'Periodicity.quarter'
    },
    {
      value: 'semester',
      display: 'Periodicity.semester'
    },
    {
      value: 'year',
      display: 'Periodicity.year'
    },
    {
      value: 'free',
      display: 'Periodicity.free'
    }
  ];

  get selectedEntities() {
    return this.dataSourceForm ? this.entities.filter(x => this.dataSourceForm.controls.entities.value.includes(x.id)) : [];
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
      end: [this.form.end]
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

}
