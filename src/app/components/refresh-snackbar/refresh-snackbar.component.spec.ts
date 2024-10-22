import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatLegacySnackBarModule as MatSnackBarModule, MatLegacySnackBarRef as MatSnackBarRef } from '@angular/material/legacy-snack-bar';
import { TranslateModule } from '@ngx-translate/core';

import { RefreshSnackbarComponent } from './refresh-snackbar.component';

describe('RefreshSnackbarComponent', () => {
  let component: RefreshSnackbarComponent;
  let fixture: ComponentFixture<RefreshSnackbarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [RefreshSnackbarComponent],
      imports: [TranslateModule.forRoot(), MatSnackBarModule],
      providers: [{ provide: MatSnackBarRef, useValue: {} }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefreshSnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
