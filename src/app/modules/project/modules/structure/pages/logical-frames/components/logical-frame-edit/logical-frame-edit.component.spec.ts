import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { LocalizedDatePipeModule } from 'src/app/pipes/LocalizedDate/localized-date-pipe.module';

import { LogicalFrameEditComponent } from './logical-frame-edit.component';

describe('LogicalFrameEditComponent', () => {
  let component: LogicalFrameEditComponent;
  let fixture: ComponentFixture<LogicalFrameEditComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LogicalFrameEditComponent],
      imports: [
        ReactiveFormsModule,
        MatDialogModule,
        HttpClientTestingModule,
        RouterTestingModule,
        TranslateModule.forRoot(),
        LocalizedDatePipeModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogicalFrameEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
