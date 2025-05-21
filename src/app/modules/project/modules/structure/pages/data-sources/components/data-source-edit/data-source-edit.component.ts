import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ChangeDetectorRef, Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormArray, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { ComponentCanDeactivate } from 'src/app/guards/pending-changes.guard';
import { Entity } from 'src/app/models/classes/entity.model';
import { FormElement } from 'src/app/models/classes/form-element.model';
import { Form } from 'src/app/models/classes/form.model';
import { Group } from 'src/app/models/classes/group.model';
import { PartitionElement } from 'src/app/models/classes/partition-element.model';
import { PartitionGroup } from 'src/app/models/classes/partition-group.model';
import { Partition } from 'src/app/models/classes/partition.model';
import { Project } from 'src/app/models/classes/project.model';
import InformationItem from 'src/app/models/interfaces/information-item';
import BreadcrumbItem from 'src/app/models/interfaces/breadcrumb-item.model';
import { DateService } from 'src/app/services/date.service';
import { ProjectService } from 'src/app/services/project.service';
import DatesHelper from 'src/app/utils/dates-helper';
import { MY_DATE_FORMATS } from 'src/app/utils/format-datepicker-helper';
import { TimeSlotPeriodicity } from 'src/app/utils/time-slot-periodicity';
import { DeleteModalComponent } from '../../../../components/delete-modal/delete-modal.component';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { v4 as uuid } from 'uuid';

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

  informations = [
    {
      res1: 'InformationPanel.Datasource_edit',
      res2: ''
    } as InformationItem,
    {
      res1: 'InformationPanel.General_Naming_convention_question',
      res2: 'InformationPanel.General_Naming_convention_response'
    } as InformationItem,
    {
      res1: 'InformationPanel.General_accidental_delete_question',
      res2: 'InformationPanel.General_accidental_delete_response'
    } as InformationItem,
    {
      res1: 'InformationPanel.General_delete_saved_question',
      res2: 'InformationPanel.General_delete_saved_response'
    } as InformationItem,
    {
      res1: 'InformationPanel.Datasource_edit_question1',
      res2: 'InformationPanel.Datasource_edit_response1'
    } as InformationItem,
    {
      res1: 'InformationPanel.Datasource_edit_question2',
      res2: 'InformationPanel.Datasource_edit_response2'
    } as InformationItem,
    {
      res1: 'InformationPanel.Datasource_edit_question3',
      res2: 'InformationPanel.Datasource_edit_response3'
    } as InformationItem,
    {
      res1: 'InformationPanel.Datasource_edit_question4',
      res2 : 'InformationPanel.Datasource_edit_response4'
    } as InformationItem,
    {
      res1: 'InformationPanel.Datasource_edit_question5',
      res2: 'InformationPanel.Datasource_edit_response5'
    } as InformationItem,
    {
      res1: 'InformationPanel.Datasource_edit_question6',
      res2: 'InformationPanel.Datasource_edit_response6'
    } as InformationItem,
    {
      res1: 'InformationPanel.Datasource_edit_question7',
      res2: 'InformationPanel.Datasource_edit_response7'
    } as InformationItem,
    {
      res1: 'InformationPanel.Datasource_edit_question8',
      res2: 'InformationPanel.Datasource_edit_response8'
    } as InformationItem
  ];

  dataSourceForm: UntypedFormGroup = new UntypedFormGroup({
    id: new UntypedFormControl(null),
    name: new UntypedFormControl(null, [Validators.required]),
    entities: new UntypedFormControl(null),
    periodicity: new UntypedFormControl(null, [Validators.required]),
    start: new UntypedFormControl(null, [Validators.required]),
    end: new UntypedFormControl(null, [Validators.required]),
    elements: new UntypedFormArray([], [this.minLengthArray(1)])
  });

  startDate: Date;
  endDate: Date;

  public entities: Entity[];
  public groups: Group[];
  public form: Form;
  public project: Project;
  public periodicities = [];
  public allOption: Entity = new Entity({id: 'all', name: 'All'});
  public startDateDisabled = true;

  private subscription: Subscription = new Subscription();

  get elements(): UntypedFormArray {
    return this.dataSourceForm.controls.elements as UntypedFormArray;
  }

  private formSubscription: Subscription;

  constructor(
    private fb: UntypedFormBuilder,
    private adapter: DateAdapter<any>,
    private dateService: DateService,
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private ref: ChangeDetectorRef
  ) { }

  @HostListener('window:beforeunload')
  canDeactivate(): Observable<boolean> | boolean {
    return !this.projectService.hasPendingChanges;
  }

  ngOnInit(): void {
    this.subscription.add(
      combineLatest([this.projectService.openedProject, this.route.paramMap]).pipe(
        map(results => ({ project: results[0], formId: (results[1] as ParamMap).get('id') }))
      ).subscribe((res: { project: Project, formId: string }) => {
        this.project = res.project;
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
          if (this.project.region) {
            breadCrumbs.splice(2, 0, 
              {
                value: this.project.region,
              } as BreadcrumbItem,
            );
          }
          this.projectService.updateBreadCrumbs(breadCrumbs);
        }

        if (!this.form) {
          this.router.navigate(['..'], { relativeTo: this.route });
        } else if (JSON.stringify(oldForm) !== JSON.stringify(this.form)) {
          this.entities = res.project.entities;
          this.groups = res.project.groups;
          this.setForm();
          this.projectService.hasInputs(this.project.id, this.form.id).then((res: boolean) => {
            this.startDateDisabled = res;
            this.ref.detectChanges();
          });
        }
      })
    );

    for (const value of Object.values(TimeSlotPeriodicity)) {
      this.periodicities.push({
        value,
        display: `Enum.Periodicity.${value}`
      });
    }

    this.subscription.add(
      this.dateService.currentLang.subscribe(
        lang => {
          this.adapter.setLocale(lang);
        }
      )
    );
    this.projectService.updateInformationPanel(this.informations);
  }

  private setForm(): void {
    if (this.formSubscription) {
      this.formSubscription.unsubscribe();
    }
    this.dataSourceForm = this.fb.group({
      id: [this.form.id],
      name: [this.form.name, Validators.required],
      entities: [this.form.entities],
      periodicity: [this.form.periodicity, Validators.required],
      start: [this.form.start ? this.form.start : this.project.start, Validators.required],
      end: [this.form.end ? this.form.end : this.project.end, Validators.required],
      elements: this.fb.array(this.form.elements.map(x => this.newElement(x)), [this.minLengthArray(1)])
    }, { validators: [DatesHelper.orderedDates('start', 'end')] });
    this.formSubscription = this.dataSourceForm.valueChanges.subscribe((value: any) => {
      // preventing 'allOption' and groups from being saved inside the project
      value.entities = value.entities.filter(e => this.entities.includes(e));
      this.projectService.valid = this.dataSourceForm.valid && this.datesAreInRange();
      this.form.deserialize(value);
      this.projectService.project.next(this.project);
      console.log(value);
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


  onAddNewElement(): void {
    this.elements.push(this.newElement());
  }

  onDupElement(i: number): void {
    const dupElement = {...this.elements.value[i]};
    dupElement.id = uuid();
    dupElement.name = 'CLONE - ' + dupElement.name;
    this.elements.push(this.newElement(dupElement));
  }

  onRemoveElement(i: number): void {
    const dialogRef = this.dialog.open(DeleteModalComponent, { data: { type: 'data', item: this.elements.value[i].name, plural: true } });

    const dialogSubscription = dialogRef.afterClosed().subscribe(res => {
      if (res && res.delete) {
        this.elements.removeAt(i);
        // Workaraound to update the forms
        this.elements.patchValue(this.elements.value);
        dialogSubscription.unsubscribe();
      }
    });
  }

  private newElement(element?: FormElement): UntypedFormGroup {
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

  private newPartition(partition: Partition): UntypedFormGroup {
    const partitionForm = this.fb.group({
      id: [partition.id],
      name: [partition.name, Validators.required],
      aggregation: [partition.aggregation],
      elements: this.fb.array(partition.elements.map(x => this.newPartitionElement(x))),
      useGroups: [partition.useGroups]
    });
    const elements = partitionForm.controls.elements as UntypedFormArray;
    partitionForm.addControl('groups', this.fb.array(
      partition.useGroups ? partition.groups.map(x => this.newPartitionGroup(x, elements)) : []));
    return partitionForm;
  }

  private newPartitionElement(partitionElement: PartitionElement): UntypedFormGroup {
    return this.fb.group({
      id: [partitionElement.id],
      name: [partitionElement.name, Validators.required]
    });
  }

  private newPartitionGroup(partitionGroup: PartitionGroup, elements: UntypedFormArray): UntypedFormGroup {
    return this.fb.group({
      id: [partitionGroup.id],
      name: [partitionGroup.name, Validators.required],
      members: [elements.value.filter(x => partitionGroup.members.map(m => m.id).includes(x.id))]
    });
  }

  private datesAreInRange(): boolean {
    const dataSource = this.dataSourceForm.value;
    if (dataSource.start && dataSource.end) {
      const start = (dataSource.start as any)._d || dataSource.start ;
      const end = (dataSource.end as any)._d || dataSource.end ;
      if (start.getTime() < this.project.start.getTime() ||
          end.getTime() > this.project.end.getTime()) {
        this.projectService.errorMessage = {
          message: 'DatesOutOfRange',
          type: 'DataSource'
        };
        return false;
      } else {
        const subscription = this.projectService.lastSavedVersion.subscribe(res => {
          const oldDataSource = res.forms.find(form => form.id === this.dataSourceForm.value.id);
          if (start.getTime() > oldDataSource.start.getTime()) {
            this.projectService.warningMessage = {
              message: 'DataDeletionStart',
              type: 'DataSource'
            };
          } else if (end.getTime() < oldDataSource.end.getTime()) {
            this.projectService.warningMessage = {
              message: 'DataDeletionEnd',
              type: 'DataSource'
            };
          } else {
            this.projectService.warningMessage = undefined;
          }
        });
        subscription.unsubscribe();
      }
    }
    this.projectService.errorMessage = undefined;
    return true;
  }

  // drag and drop function on a form array displayed in one column
  drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.elements.controls, event.previousIndex, event.currentIndex);
    // Dummy code so the save button is available
    const control = this.elements.at(0);
    this.elements.setControl(0, control);
  }

  ngOnDestroy(): void {
    if (this.formSubscription) {
      this.formSubscription.unsubscribe();
    }
    this.subscription.unsubscribe();
  }

}
