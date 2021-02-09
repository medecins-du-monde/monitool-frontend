import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Entity } from 'src/app/models/classes/entity.model';
import { FormElement } from 'src/app/models/classes/form-element.model';
import { Form } from 'src/app/models/classes/form.model';
import { PartitionElement } from 'src/app/models/classes/partition-element.model';
import { PartitionGroup } from 'src/app/models/classes/partition-group.model';
import { Partition } from 'src/app/models/classes/partition.model';
import { Project } from 'src/app/models/classes/project.model';
import { ProjectService } from 'src/app/services/project.service';
import DatesHelper from 'src/app/utils/dates-helper';
import { TimeSlotPeriodicity } from 'src/app/utils/time-slot-periodicity';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MY_DATE_FORMATS } from 'src/app/utils/format-datepicker-helper';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import { DateService} from 'src/app/services/date.service';


@Component({
  selector: 'app-data-source-edit',
  templateUrl: './data-source-edit.component.html',
  styleUrls: ['./data-source-edit.component.scss'],
  providers: [
    {
      provide: DateAdapter, useClass: MomentDateAdapter,
      deps: [
        MAT_DATE_LOCALE,
        MAT_MOMENT_DATE_ADAPTER_OPTIONS
      ]
    },
    {
      provide: MAT_DATE_FORMATS,
      useValue: MY_DATE_FORMATS
    }
  ]
})
export class DataSourceEditComponent implements OnInit, OnChanges {

  dataSourceForm: FormGroup;
  startDate: Date;
  endDate: Date;

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
    private fb: FormBuilder,
    private adapter: DateAdapter<any>,
    private dateService: DateService,
    private projectService: ProjectService,
  ) { }

  ngOnInit(): void {
    this.setForm();

    for (const value of Object.values(TimeSlotPeriodicity)){
      this.periodicities.push({
        value,
        display: `Enum.Periodicity.${value}`
      });
    }

    this.dateService.currentLang.subscribe(
      lang => {
        this.adapter.setLocale(lang);
      }
    );
  }

  ngOnChanges(): void {
    this.setForm();
  }

  private setForm(): void {
    this.dataSourceForm = this.fb.group({
      id: [this.form.id],
      name: [this.form.name, Validators.required],
      entities: [this.entities.filter(x => this.form.entities.map(e => e.id).includes(x.id))],
      periodicity: [this.form.periodicity, Validators.required],
      start: [this.form.start, Validators.required],
      end: [this.form.end, Validators.required],
      elements: this.fb.array(this.form.elements.map(x => this.newElement(x)))
    });
    this.dataSourceForm.valueChanges.subscribe((value: any) => {
      this.projectService.valid = this.dataSourceForm.valid;
      this.edit.emit(this.form.deserialize(value));
    });
  }

  toggleCustomDate(event: any, selected: string): void {
      if (event.value === 'false') {
        this.dataSourceForm.get(selected).setValue(this.project[selected]);
      }
      else {
        this.dataSourceForm.get(selected).setValue(null);
      }
  }

  isCustom(selected: string): boolean {
    return !DatesHelper.areEquals(new Date(this.dataSourceForm.get(selected).value), new Date(this.project[selected]));
  }

  onEntityRemoved(entity: Entity): void {
    const entities = this.dataSourceForm.controls.entities.value;
    this.dataSourceForm.controls.entities.setValue(entities.filter(x => x.id !== entity.id));
  }

  onAddNewElement(): void {
    this.elements.push(this.newElement());
  }

  onRemoveElement(i: number): void {
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
