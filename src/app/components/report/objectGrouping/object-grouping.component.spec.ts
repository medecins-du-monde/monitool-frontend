import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { Project } from 'src/app/models/classes/project.model';

import { ObjectGroupingComponent } from './object-grouping.component';

describe('ObjectGroupingComponent', () => {
  let component: ObjectGroupingComponent;
  let fixture: ComponentFixture<ObjectGroupingComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ObjectGroupingComponent],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        TranslateModule.forRoot(),
        RouterTestingModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule,
        MatSelectModule,
        MatDialogModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectGroupingComponent);
    component = fixture.componentInstance;
    component.project = new Project({
      id: 'id',
      rev: 'rev',
      type: 'project',
      name: 'name',
      active: true,
      start: new Date('2022-11-23T23:05:11.938Z'),
      end: new Date('2022-11-23T23:05:11.938Z'),
      inputDate: new Date('2022-11-23T23:05:11.938Z'),
      country: 'country',
      themes: [],
      crossCutting: {},
      extraIndicators: [],
      logicalFrames: [],
      entities: [],
      groups: [],
      forms: [],
      users: [],
      visibility: 'visibility'
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
