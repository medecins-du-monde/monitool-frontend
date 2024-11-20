import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { TranslateModule } from '@ngx-translate/core';

import { ExtraIndicatorsComponent } from './extra-indicators.component';

describe('ExtraIndicatorsComponent', () => {
  let component: ExtraIndicatorsComponent;
  let fixture: ComponentFixture<ExtraIndicatorsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ExtraIndicatorsComponent],
      imports: [
        HttpClientTestingModule,
        MatDialogModule,
        ReactiveFormsModule,
        TranslateModule.forRoot()
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtraIndicatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
