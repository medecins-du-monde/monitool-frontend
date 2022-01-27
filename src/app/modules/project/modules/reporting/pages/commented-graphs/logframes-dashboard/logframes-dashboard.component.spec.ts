import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogframesDashboardComponent } from './logframes-dashboard.component';

describe('LogframesDashboardComponent', () => {
  let component: LogframesDashboardComponent;
  let fixture: ComponentFixture<LogframesDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogframesDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogframesDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
