import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { ChangeDetectorRef, Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import * as _ from 'lodash';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Entity } from 'src/app/models/classes/entity.model';
import { Group } from 'src/app/models/classes/group.model';
import { LogicalFrame } from 'src/app/models/classes/logical-frame.model';
import { Project } from 'src/app/models/classes/project.model';
import { Purpose } from 'src/app/models/classes/purpose.model';
import BreadcrumbItem from 'src/app/models/interfaces/breadcrumb-item.model';
import { DateService } from 'src/app/services/date.service';
import { ProjectService } from 'src/app/services/project.service';
import DatesHelper from 'src/app/utils/dates-helper';
import FormGroupBuilder from 'src/app/utils/form-group-builder';
import { MY_DATE_FORMATS } from 'src/app/utils/format-datepicker-helper';
import { IndicatorModalComponent } from '../indicator-modal/indicator-modal.component';

@Component({
  selector: 'app-logical-frame-edit',
  templateUrl: './logical-frame-edit.component.html',
  styleUrls: ['./logical-frame-edit.component.scss'],
  // TODO: put the provided information in a shared component if possible
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
export class LogicalFrameEditComponent implements OnInit, OnDestroy {

  logicalFrameForm: FormGroup = new FormGroup({
    id: new FormControl(null),
    name: new FormControl(null, [Validators.required]),
    entities: new FormControl(null, [Validators.required]),
    periodicity: new FormControl(null, [Validators.required]),
    start: new FormControl(null, [Validators.required]),
    end: new FormControl(null, [Validators.required]),
    goal: new FormControl(null, [Validators.required]),
    indicators: new FormArray([]),
    purposes: new FormArray([])
  });

  public project: Project;
  public entities: Entity[];
  public groups: Group[];
  public logicalFrame: LogicalFrame;

  get purposes(): FormArray {
    return this.logicalFrameForm.controls.purposes as FormArray;
  }

  get indicators(): FormArray {
    return this.logicalFrameForm.controls.indicators as FormArray;
  }

  private formSubscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private adapter: DateAdapter<any>,
    private dateService: DateService,
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private router: Router,
    private changeDetector: ChangeDetectorRef
  ) { }

  @HostListener('window:beforeunload')
  canDeactivate(): Observable<boolean> | boolean {
    return !this.projectService.hasPendingChanges;
  }

  ngOnInit(): void {
    combineLatest([this.projectService.openedProject, this.route.paramMap]).pipe(
      map(results => ({ project: results[0], logicalFrameId: (results[1] as ParamMap).get('id') }))
    ).subscribe((res: { project: Project, logicalFrameId: string }) => {
      this.project = res.project;
      const oldLogicalFrame = this.logicalFrame;
      this.logicalFrame = res.project.logicalFrames.find(x => x.id === res.logicalFrameId);

      if (this.logicalFrame) {
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
            value: 'LogicalFrameworks',
            link: `./../../projects/${this.project.id}/structure/logical-frames`
          } as BreadcrumbItem,
          {
            value: this.logicalFrame.name,
          } as BreadcrumbItem,
        ];
        this.projectService.updateBreadCrumbs(breadCrumbs);
      }
      if (!this.logicalFrame) {
        this.router.navigate(['..'], { relativeTo: this.route });
      } else if ( !oldLogicalFrame || !oldLogicalFrame.equals(this.logicalFrame) ) {
        this.entities = res.project.entities;
        this.groups = res.project.groups;
        this.setForm();
      }
    });

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

    this.logicalFrameForm = this.fb.group({
      id: [this.logicalFrame.id],
      name: [this.logicalFrame.name, Validators.required],
      entities: [this.entities.filter(x => this.logicalFrame.entities.map(e => e.id).includes(x.id))],
      start: [this.logicalFrame.start, Validators.required],
      end: [this.logicalFrame.end, Validators.required],
      goal: [this.logicalFrame.goal, Validators.required],
      indicators: this.fb.array(this.logicalFrame.indicators.map(x => FormGroupBuilder.newIndicator(x))),
      purposes: this.fb.array(this.logicalFrame.purposes.map(x => FormGroupBuilder.newPurpose(x)))
    }, { validators: [DatesHelper.orderedDates('start', 'end')] });

    this.formSubscription = this.logicalFrameForm.valueChanges.subscribe((value: any) => {
      // preventing 'allOption' and groups from being saved inside the project
      value.entities = value.entities.filter(e => this.entities.includes(e));
      this.projectService.valid = this.logicalFrameForm.valid;
      this.logicalFrame.deserialize(value);
      this.projectService.project.next(this.project);
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
    return this.project && this.logicalFrameForm
      && !DatesHelper.areEquals(new Date(this.logicalFrameForm.get(selected).value), new Date(this.project[selected]));
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
      this.changeDetector.markForCheck();
    });
  }

  // drag and drop function on a form array displayed in one column
  drop(event: CdkDragDrop<string[]>) {
    const selectedControl = this.purposes.at(event.previousIndex);
    const newControls = this.purposes.at(event.currentIndex);
    this.purposes.setControl(event.previousIndex, newControls);
    this.purposes.setControl(event.currentIndex, selectedControl);
  }

  // drag and drop function on a form array that can span accross multiple rows
  dropIndicators(event: CdkDragDrop<any>) {
    this.indicators.setControl(event.previousContainer.data.index, event.container.data.indicator);
    this.indicators.setControl(event.container.data.index, event.previousContainer.data.indicator);
  }

  get logFrameName() {
    return this.logicalFrameForm.value.name;
  }

  get logFrameGoal() {
    return this.logicalFrameForm.value.goal;
  }

}
