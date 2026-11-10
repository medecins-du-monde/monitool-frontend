import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatLegacyDialogModule as MatDialogModule,
  MatLegacyDialogRef as MatDialogRef,
  MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA
} from '@angular/material/legacy-dialog';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { User } from 'src/app/models/classes/user.model';
import { UserService } from 'src/app/services/user.service';

import { UserModalComponent } from './user-modal.component';

describe('UserModalComponent', () => {
  let component: UserModalComponent;
  let fixture: ComponentFixture<UserModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [UserModalComponent],
      imports: [
        ReactiveFormsModule,
        MatDialogModule,
        ReactiveFormsModule,
        TranslateModule.forRoot(),
        HttpClientTestingModule,
        MatSelectModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            id: 'test',
            type: 'test',
            rev: 'test',
            role: 'test',
            name: 'test',
            username: 'test',
            password: 'test',
            entities: [],
            dataSources: [],
            projectId: 'test'
          }
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

describe('UserModalComponent editing an account', () => {
  let close: jasmine.Spy;

  const open = (data: User): UserModalComponent => {
    TestBed.overrideProvider(MAT_DIALOG_DATA, { useValue: data });
    const fixture = TestBed.createComponent(UserModalComponent);
    TestBed.inject(UserService).userList.next([
      new User({ _id: 'user:alice', type: 'user', name: 'Alice', active: true }),
      new User({ _id: 'user:carol', type: 'user', name: 'Carol', active: true })
    ]);
    fixture.detectChanges();
    return fixture.componentInstance;
  };

  beforeEach(waitForAsync(() => {
    close = jasmine.createSpy('close');
    TestBed.configureTestingModule({
      declarations: [UserModalComponent],
      imports: [
        ReactiveFormsModule,
        MatDialogModule,
        TranslateModule.forRoot(),
        HttpClientTestingModule,
        MatSelectModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: { close } },
        { provide: MAT_DIALOG_DATA, useValue: null }
      ]
    }).compileComponents();
  }));

  it('returns the name of the newly selected MDM account', () => {
    const modal = open(new User({ type: 'internal', id: 'user:alice', name: 'Alice', role: 'owner' }));

    modal.userForm.patchValue({ id: 'user:carol' });
    expect(modal.canSubmitForm()).toBeTrue();
    modal.onSubmit();

    const edited: User = close.calls.mostRecent().args[0].data;
    expect(edited.id).toBe('user:carol');
    expect(edited.name).toBe('Carol');
  });

  it('keeps the stored name of an account missing from the active list', () => {
    const modal = open(new User({ type: 'internal', id: 'user:gone', name: 'Gone', role: 'owner' }));

    modal.userForm.patchValue({ role: 'read' });
    modal.onSubmit();

    expect(close.calls.mostRecent().args[0].data.name).toBe('Gone');
  });

  it('requires a new password when a partner login changes', () => {
    const modal = open(new User({ type: 'partner', username: 'old', name: 'Partner', role: 'owner', password: null }));

    modal.userForm.patchValue({ username: 'new' });
    expect(modal.canSubmitForm()).toBeFalse();

    modal.userForm.patchValue({ password: 'secret1' });
    expect(modal.canSubmitForm()).toBeTrue();
  });

  it('does not require a password when the partner login is unchanged', () => {
    const modal = open(new User({ type: 'partner', username: 'old', name: 'Partner', role: 'owner', password: null }));

    modal.userForm.patchValue({ name: 'Renamed' });
    expect(modal.canSubmitForm()).toBeTrue();
  });

  it('requires a password when an MDM account becomes a partner', () => {
    const modal = open(new User({ type: 'internal', id: 'user:alice', name: 'Alice', role: 'owner' }));

    modal.userForm.patchValue({ type: 'partner', username: 'alice-partner' });
    expect(modal.canSubmitForm()).toBeFalse();
  });
});
