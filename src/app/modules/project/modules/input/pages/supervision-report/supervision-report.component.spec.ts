import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupervisionReportComponent } from './supervision-report.component';

describe('SupervisionReportComponent', () => {
  let component: SupervisionReportComponent;
  let fixture: ComponentFixture<SupervisionReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupervisionReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupervisionReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
