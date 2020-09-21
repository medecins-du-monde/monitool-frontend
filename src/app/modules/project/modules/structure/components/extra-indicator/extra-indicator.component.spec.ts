import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtraIndicatorComponent } from './extra-indicator.component';

describe('ExtraIndicatorComponent', () => {
  let component: ExtraIndicatorComponent;
  let fixture: ComponentFixture<ExtraIndicatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtraIndicatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtraIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
