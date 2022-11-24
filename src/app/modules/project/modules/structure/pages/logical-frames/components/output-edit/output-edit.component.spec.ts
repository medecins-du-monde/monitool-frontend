import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';

import { OutputEditComponent } from './output-edit.component';

describe('OutputEditComponent', () => {
  let component: OutputEditComponent;
  let fixture: ComponentFixture<OutputEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OutputEditComponent],
      imports: [MatDialogModule, ReactiveFormsModule, TranslateModule.forRoot()]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutputEditComponent);
    component = fixture.componentInstance;
    component.outputForm = new FormGroup({
      indicators: new FormArray([]),
      activities: new FormArray([]),
      description: new FormControl(''),
      assumptions: new FormControl(''),
    });
    component.forms = [];

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
