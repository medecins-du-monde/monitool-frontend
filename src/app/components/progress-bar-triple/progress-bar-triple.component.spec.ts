import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressBarTripleComponent } from './progress-bar-triple.component';

describe('ProgressBarTripleComponent', () => {
  let component: ProgressBarTripleComponent;
  let fixture: ComponentFixture<ProgressBarTripleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgressBarTripleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressBarTripleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
