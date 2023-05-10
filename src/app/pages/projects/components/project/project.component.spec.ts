import { DatePipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { Project } from 'src/app/models/classes/project.model';
import { LocalizedDatePipeModule } from 'src/app/pipes/LocalizedDate/localized-date-pipe.module';
import { LocalizedDatePipe } from 'src/app/pipes/LocalizedDate/LocalizedDatePipe';

import { ProjectComponent } from './project.component';

describe('ProjectComponent', () => {
  let component: ProjectComponent;
  let fixture: ComponentFixture<ProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectComponent],
      imports: [
        TranslateModule.forRoot(),
        HttpClientTestingModule,
        RouterTestingModule,
        MatDialogModule,
        LocalizedDatePipeModule,
        MatMenuModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectComponent);
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
