import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportingTableComponent } from './reporting-table.component';

describe('ReportingTableComponent', () => {
  let component: ReportingTableComponent;
  let fixture: ComponentFixture<ReportingTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportingTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportingTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
