import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { UntypedFormArray, UntypedFormControl, UntypedFormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';

import { OutputEditComponent } from './output-edit.component';

describe('OutputEditComponent', () => {
  let component: OutputEditComponent;
  let fixture: ComponentFixture<OutputEditComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [OutputEditComponent],
      imports: [MatDialogModule, ReactiveFormsModule, TranslateModule.forRoot()]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutputEditComponent);
    component = fixture.componentInstance;
    component.outputForm = new UntypedFormGroup({
      indicators: new UntypedFormArray([]),
      activities: new UntypedFormArray([]),
      description: new UntypedFormControl(''),
      assumptions: new UntypedFormControl(''),
    });
    component.forms = [];

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
