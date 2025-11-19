import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { Project } from 'src/app/models/classes/project.model';

import { ReportingMenuComponent } from './reporting-menu.component';

describe('ReportingMenuComponent', () => {
  let component: ReportingMenuComponent;
  let fixture: ComponentFixture<ReportingMenuComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ReportingMenuComponent],
      imports: [HttpClientTestingModule, TranslateModule.forRoot()]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportingMenuComponent);
    component = fixture.componentInstance;

    component.indicator = {
      icon: true,
      name: 'test',
      unit: 'test',
      baseline: 1,
      colorize: true,
      target: 1,
      sectionId: 1,
      values: {},
      onChart: true,
      dataset: {},
      filterFlag: true,
      computation: {},
      originProject: new Project({
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
      }),
      customFilter: {},
      nextRow: {
        title: 'test',
        sectionId: 1,
        open: true,
        id: '1',
        level: 1,
        click: () => {
          return;
        },
        comment: {value: 'test'},
        commentID: 'testID'
      },
      open: true,
      level: 1,
      disaggregatedBy: null,
      commentInfo: null,
      isGroupDisaggregation: false,
    };
    component.dimensionName = 'test';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
