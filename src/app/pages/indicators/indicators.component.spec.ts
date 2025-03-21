import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { IndicatorsComponent } from './indicators.component';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';

describe('IndicatorsComponent', () => {
  let component: IndicatorsComponent;
  let fixture: ComponentFixture<IndicatorsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [IndicatorsComponent],
      imports: [TranslateModule.forRoot(), HttpClientTestingModule, MatDialogModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndicatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
