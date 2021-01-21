import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import * as _ from 'lodash';
import { Entity } from 'src/app/models/classes/entity.model';
import { Form } from 'src/app/models/classes/form.model';
import { LogicalFrame } from 'src/app/models/classes/logical-frame.model';
import { Purpose } from 'src/app/models/classes/purpose.model';
import { IndicatorModalComponent } from '../indicator-modal/indicator-modal.component';
import FormGroupBuilder from 'src/app/utils/form-group-builder';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MY_DATE_FORMATS } from 'src/app/utils/format-datepicker-helper';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import { DateService} from 'src/app/services/date.service';

@Component({
  selector: 'app-logical-frame-edit',
  templateUrl: './logical-frame-edit.component.html',
  styleUrls: ['./logical-frame-edit.component.scss'],
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
export class LogicalFrameEditComponent implements OnInit, OnChanges {

  logicalFrameForm: FormGroup;

  @Input() forms: Form[];
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
    private adapter: DateAdapter<any>,
    private dateService: DateService,
  ) { }

  ngOnInit(): void {
    this.setForm();
    this.dateService.langValueObs$.subscribe(
      lang=>{
        this.adapter.setLocale(lang);
      }
    );
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
      indicators: this.fb.array(this.logicalFrame.indicators.map(x => FormGroupBuilder.newIndicator(x))),
      purposes: this.fb.array(this.logicalFrame.purposes.map(x => FormGroupBuilder.newPurpose(x)))
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
    this.purposes.push(FormGroupBuilder.newPurpose());
  }

  onEditPurpose(purpose: Purpose, index: number) {
    this.purposes.setControl(index, _.cloneDeep(FormGroupBuilder.newPurpose(purpose)));
  }

  onRemovePurpose(i: number) {
    this.purposes.removeAt(i);
  }

  onAddNewIndicator(): void {
    this.openDialog(FormGroupBuilder.newIndicator(), true);
  }

  onEditIndicator(indicator: FormGroup, index?: number) {
    this.openDialog(FormGroupBuilder.newIndicator(indicator.value), false, index);
  }

  onDeleteIndicator(i: number) {
    this.indicators.removeAt(i);
  }

  openDialog(indicator: FormGroup, add?: boolean, index?: number) {
    const dialogRef = this.dialog.open(IndicatorModalComponent, { data: { indicator, forms: this.forms } });

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

}
