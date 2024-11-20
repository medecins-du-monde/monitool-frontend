import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { Indicator } from 'src/app/models/classes/indicator.model';

import { IndicatorModalComponent } from './indicator-modal.component';

describe('IndicatorModalComponent', () => {
  let component: IndicatorModalComponent;
  let fixture: ComponentFixture<IndicatorModalComponent>;

  beforeEach(waitForAsync(() => {
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
