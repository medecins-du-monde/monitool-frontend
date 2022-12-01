import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

import { ReportingTableComponent } from './reporting-table.component';

describe('ReportingTableComponent', () => {
  let component: ReportingTableComponent;
  let fixture: ComponentFixture<ReportingTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ReportingTableComponent],
      imports: [HttpClientTestingModule, TranslateModule.forRoot()]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportingTableComponent);
    component = fixture.componentInstance;
    component.tableContent = new BehaviorSubject([]);
    component.dimensionIds = new BehaviorSubject('entity');
    component.filter = new BehaviorSubject({
      _start: new Date(),
      _end: new Date(),
      entities: [],
      finished: false
    });
    component.isCrossCuttingReport = false;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
