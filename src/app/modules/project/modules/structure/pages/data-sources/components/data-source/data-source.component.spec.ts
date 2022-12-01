import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { TranslateModule } from '@ngx-translate/core';
import { Form } from 'src/app/models/classes/form.model';
import { Project } from 'src/app/models/classes/project.model';
import { LocalizedDatePipeModule } from 'src/app/pipes/LocalizedDate/localized-date-pipe.module';

import { DataSourceComponent } from './data-source.component';

describe('DataSourceComponent', () => {
  let component: DataSourceComponent;
  let fixture: ComponentFixture<DataSourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DataSourceComponent],
      imports: [
        TranslateModule.forRoot(),
        MatDialogModule,
        HttpClientTestingModule,
        LocalizedDatePipeModule,
        MatMenuModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataSourceComponent);
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
    component.form = new Form({
      id: 'id',
      name: 'name',
      start: new Date('2022-11-23T23:05:11.938Z'),
      end: new Date('2022-11-23T23:05:11.938Z'),
      periodicity: 'periodicity',
      elements: [],
      entities: []
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
