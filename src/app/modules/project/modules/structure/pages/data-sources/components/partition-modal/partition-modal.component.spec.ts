import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {
  UntypedFormArray,
  UntypedFormControl,
  UntypedFormGroup,
  ReactiveFormsModule
} from '@angular/forms';
import { MatLegacyCheckboxModule as MatCheckboxModule } from '@angular/material/legacy-checkbox';
import { MatLegacyDialogModule as MatDialogModule, MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { Partition } from 'src/app/models/classes/partition.model';

import { PartitionModalComponent } from './partition-modal.component';

describe('PartitionModalComponent', () => {
  let component: PartitionModalComponent;
  let fixture: ComponentFixture<PartitionModalComponent>;
  const partition = new Partition();

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PartitionModalComponent],
      imports: [
        ReactiveFormsModule,
        TranslateModule.forRoot(),
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule,
        MatSelectModule,
        MatCheckboxModule,
        MatDialogModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        {
          provide: MAT_DIALOG_DATA,
          useValue: new UntypedFormGroup({
            id: new UntypedFormControl(partition.id),
            name: new UntypedFormControl(partition.name),
            aggregation: new UntypedFormControl(partition.aggregation),
            elements: new UntypedFormArray([]),
            useGroups: new UntypedFormControl(partition.useGroups),
            groups: new UntypedFormArray([])
          })
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartitionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
