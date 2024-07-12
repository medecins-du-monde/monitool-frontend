import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { TranslateModule } from '@ngx-translate/core';
import { Indicator } from 'src/app/models/classes/indicator.model';

import { IndicatorComponent } from './indicator.component';

describe('IndicatorComponent', () => {
  let component: IndicatorComponent;
  let fixture: ComponentFixture<IndicatorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [IndicatorComponent],
      imports: [
        MatDialogModule,
        TranslateModule.forRoot(),
        HttpClientTestingModule,
        MatMenuModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndicatorComponent);
    component = fixture.componentInstance;
    component.indicator = new Indicator({
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
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
