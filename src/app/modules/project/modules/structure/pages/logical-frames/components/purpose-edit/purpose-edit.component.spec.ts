import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';
import { Form } from 'src/app/models/classes/form.model';

import { PurposeEditComponent } from './purpose-edit.component';

describe('PurposeEditComponent', () => {
  let component: PurposeEditComponent;
  let fixture: ComponentFixture<PurposeEditComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PurposeEditComponent],
      imports: [MatDialogModule, TranslateModule.forRoot()]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurposeEditComponent);
    component = fixture.componentInstance;
    component.forms = [
      new Form({
        id: 'id',
        name: 'name',
        start: new Date('2022-11-23T23:05:11.938Z'),
        end: new Date('2022-11-23T23:05:11.938Z'),
        periodicity: 'periodicity',
        elements: [],
        entities: []
      }) as any
    ];
    component.purposeForm = new FormGroup({
      assumptions: new FormControl('assumptions'),
      description: new FormControl('description'),
      indicators: new FormArray([]),
      outputs: new FormArray([])
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
