import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {
  UntypedFormArray,
  UntypedFormControl,
  UntypedFormGroup,
  ReactiveFormsModule
} from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
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
