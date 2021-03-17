import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { ComponentCanDeactivate } from 'src/app/guards/pending-changes.guard';
import { Entity } from 'src/app/models/classes/entity.model';
import { FormElement } from 'src/app/models/classes/form-element.model';
import { Form } from 'src/app/models/classes/form.model';
import { PartitionElement } from 'src/app/models/classes/partition-element.model';
import { PartitionGroup } from 'src/app/models/classes/partition-group.model';
import { Partition } from 'src/app/models/classes/partition.model';
import { Project } from 'src/app/models/classes/project.model';
import BreadcrumbItem from 'src/app/models/interfaces/breadcrumb-item.model';
import { DateService } from 'src/app/services/date.service';
import { ProjectService } from 'src/app/services/project.service';
import DatesHelper from 'src/app/utils/dates-helper';
import { MY_DATE_FORMATS } from 'src/app/utils/format-datepicker-helper';
import { TimeSlotPeriodicity } from 'src/app/utils/time-slot-periodicity';

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
export class DataSourceEditComponent implements ComponentCanDeactivate, OnInit, OnDestroy {

  dataSourceForm: FormGroup = new FormGroup({
    id: new FormControl(null),
    name: new FormControl(null, [Validators.required]),
    entities: new FormControl(null),
    periodicity: new FormControl(null, [Validators.required]),
    start: new FormControl(null, [Validators.required]),
    end: new FormControl(null, [Validators.required]),
    elements: new FormArray([], [this.minLengthArray(1)])
  });

  startDate: Date;
  endDate: Date;

  public entities: Entity[];
  public form: Form;
  public project: Project;
  public periodicities = [];

  get selectedEntities(): any[] {
    return this.dataSourceForm.controls.entities.value;
  }

  get elements(): FormArray {
    return this.dataSourceForm.controls.elements as FormArray;
  }

  private formSubscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private adapter: DateAdapter<any>,
    private dateService: DateService,
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  @HostListener('window:beforeunload')
  canDeactivate(): Observable<boolean> | boolean {
    return !this.projectService.hasPendingChanges;
  }

  ngOnInit(): void {
    combineLatest([this.projectService.openedProject, this.route.paramMap]).pipe(
      map(results => ({ project: results[0], formId: (results[1] as ParamMap).get('id') }))
    ).subscribe((res: { project: Project, formId: string }) => {
      this.project = res.project;
      this.entities = res.project.entities;
      const oldForm = this.form;
      this.form = res.project.forms.find(x => x.id === res.formId);

      if (this.form) {
        const breadCrumbs = [
          {
            value: 'Projects',
            link: './../../projects'
          } as BreadcrumbItem,
          {
            value: this.project.country,
          } as BreadcrumbItem,
          {
            value: this.project.name,
          } as BreadcrumbItem,
          {
            value: 'Structure',
          } as BreadcrumbItem,
          {
            value: 'DataSources',
            link: `./../../projects/${this.project.id}/structure/data-sources`
          } as BreadcrumbItem,
          {
            value: this.form.name,
          } as BreadcrumbItem,          
        ];
        this.projectService.addBreadCrumbs(breadCrumbs);
      }
      if (!this.form) {
        this.router.navigate(['..'], { relativeTo: this.route });
      } else if (JSON.stringify(oldForm) !== JSON.stringify(this.form)) {
        this.setForm();
      }
    });

    for (const value of Object.values(TimeSlotPeriodicity)) {
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

  ngOnDestroy(): void {
    if (this.formSubscription) {
      this.formSubscription.unsubscribe();
    }
  }

  private setForm(): void {
    if (this.formSubscription) {
      this.formSubscription.unsubscribe();
    }
    this.dataSourceForm = this.fb.group({
      id: [this.form.id],
      name: [this.form.name, Validators.required],
      entities: [this.entities.filter(x => this.form.entities.map(e => e.id).includes(x.id))],
      periodicity: [this.form.periodicity, Validators.required],
      start: [this.form.start, Validators.required],
      end: [this.form.end, Validators.required],
      elements: this.fb.array(this.form.elements.map(x => this.newElement(x)), [this.minLengthArray(1)])
    }, { validators: [DatesHelper.orderedDates('start', 'end')] });

    this.formSubscription = this.dataSourceForm.valueChanges.subscribe((value: any) => {
      this.projectService.valid = this.dataSourceForm.valid;
      this.form.deserialize(value);
      this.projectService.project.next(this.project);
    });
  }

  private minLengthArray(min: number): ValidatorFn {
    return (c: AbstractControl): { [key: string]: boolean } => {
      if (c.value.length >= min) {
        return null;
      }
      return { minLengthArray: true };
    };
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
    return this.project && this.dataSourceForm
      && !DatesHelper.areEquals(new Date(this.dataSourceForm.get(selected).value), new Date(this.project[selected]));
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

  // drag and drop function on a form array displayed in one column
  drop(event: CdkDragDrop<string[]>): void {
    const selectedControl = this.elements.at(event.previousIndex);
    const newControls = this.elements.at(event.currentIndex);
    this.elements.setControl(event.previousIndex, newControls);
    this.elements.setControl(event.currentIndex, selectedControl);
  }
}
