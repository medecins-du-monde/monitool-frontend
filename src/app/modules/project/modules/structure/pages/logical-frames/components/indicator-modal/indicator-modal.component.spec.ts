import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { Form } from 'src/app/models/classes/form.model';
import FormGroupBuilder from 'src/app/utils/form-group-builder';

import { IndicatorModalComponent } from './indicator-modal.component';

describe('IndicatorModalComponent', () => {
  let component: IndicatorModalComponent;
  let fixture: ComponentFixture<IndicatorModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IndicatorModalComponent],
      imports: [
        ReactiveFormsModule,
        TranslateModule.forRoot(),
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule,
        MatSelectModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            indicator: FormGroupBuilder.newIndicator(),
            forms: [
              new Form({
                id: 'id',
                name: 'name',
                start: new Date('2022-11-23T23:05:11.938Z'),
                end: new Date('2022-11-23T23:05:11.938Z'),
                periodicity: 'periodicity',
                elements: [],
                entities: []
              })
            ]
          }
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndicatorModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
