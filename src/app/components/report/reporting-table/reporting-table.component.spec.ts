import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { TranslateModule } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

import { ReportingTableComponent } from './reporting-table.component';

describe('ReportingTableComponent', () => {
  let component: ReportingTableComponent;
  let fixture: ComponentFixture<ReportingTableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ReportingTableComponent],
      imports: [
        HttpClientTestingModule,
        TranslateModule.forRoot(),
        MatDialogModule,
        MatMenuModule
      ]
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
