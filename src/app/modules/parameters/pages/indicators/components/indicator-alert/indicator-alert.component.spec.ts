import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicatorAlertComponent } from './indicator-alert.component';

describe('IndicatorAlertComponent', () => {
  let component: IndicatorAlertComponent;
  let fixture: ComponentFixture<IndicatorAlertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndicatorAlertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndicatorAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
