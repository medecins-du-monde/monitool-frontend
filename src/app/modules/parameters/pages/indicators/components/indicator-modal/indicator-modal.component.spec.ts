import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { Indicator } from 'src/app/models/classes/indicator.model';

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
        HttpClientTestingModule,
        FormsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        BrowserAnimationsModule,
        MatDialogModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: new Indicator({
          id: 'id',
          type: 'indicator',
          name: {
            en: 'name',
            es: 'nombre',
            fr: 'nom'
          },
          description: {
            en: 'description',
            es: 'descripción',
            fr: 'description'
          },
          rev: 'rev',
          themes: [],
        }) }
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
