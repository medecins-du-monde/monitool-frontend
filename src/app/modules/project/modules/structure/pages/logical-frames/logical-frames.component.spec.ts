import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogicalFramesComponent } from './logical-frames.component';

describe('LogicalFramesComponent', () => {
  let component: LogicalFramesComponent;
  let fixture: ComponentFixture<LogicalFramesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogicalFramesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogicalFramesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
