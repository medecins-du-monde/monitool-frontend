import { CommonModule, DatePipe } from '@angular/common';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatLegacyMenuModule as MatMenuModule } from '@angular/material/legacy-menu';
import { TranslateModule } from '@ngx-translate/core';
import { LogicalFrame } from 'src/app/models/classes/logical-frame.model';
import { Project } from 'src/app/models/classes/project.model';
import { LocalizedDatePipeModule } from 'src/app/pipes/LocalizedDate/localized-date-pipe.module';
import { LocalizedDatePipe } from 'src/app/pipes/LocalizedDate/LocalizedDatePipe';

import { LogicalFrameComponent } from './logical-frame.component';

describe('LogicalFrameComponent', () => {
  let component: LogicalFrameComponent;
  let fixture: ComponentFixture<LogicalFrameComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LogicalFrameComponent],
      imports: [
        TranslateModule.forRoot(),
        LocalizedDatePipeModule,
        MatMenuModule,
        CommonModule
      ],
      providers: [LocalizedDatePipe]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogicalFrameComponent);
    component = fixture.componentInstance;
    component.logicalFrame = new LogicalFrame({
      id: 'id',
      name: 'name',
      goal: '',
      start: new Date('2022-11-23T23:05:11.938Z'),
      end: new Date('2022-11-23T23:05:11.938Z'),
      entities: [],
      indicators: [],
      purposes: []
    });
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
