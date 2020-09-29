import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicatorModalComponent } from './indicator-modal.component';

describe('IndicatorModalComponent', () => {
  let component: IndicatorModalComponent;
  let fixture: ComponentFixture<IndicatorModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndicatorModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndicatorModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
