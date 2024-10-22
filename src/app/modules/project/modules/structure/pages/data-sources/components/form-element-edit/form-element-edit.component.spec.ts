import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {
  UntypedFormArray,
  UntypedFormControl,
  UntypedFormGroup,
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyMenuModule as MatMenuModule } from '@angular/material/legacy-menu';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';

import { FormElementEditComponent } from './form-element-edit.component';
const TEST_FORM_GROUP = new UntypedFormGroup({
  partitions: new UntypedFormArray([]),
  distribution: new UntypedFormControl(0),
  geoAgg: new UntypedFormControl('sum'),
  timeAgg: new UntypedFormControl('sum'),
  id: new UntypedFormControl('fec3da62-6a73-4e90-a77d-71ad4d2e2aea'),
  name: new UntypedFormControl('Number of awareness sessions focusing on OSH topics')
});

describe('FormElementEditComponent', () => {
  let component: FormElementEditComponent;
  let fixture: ComponentFixture<FormElementEditComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [FormElementEditComponent],
      imports: [
        MatDialogModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        TranslateModule.forRoot(),
        MatMenuModule,
        MatSelectModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormElementEditComponent);
    component = fixture.componentInstance;
    component.elementForm = TEST_FORM_GROUP;
    component.dataSourceName = 'Partner Monthly Report';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
