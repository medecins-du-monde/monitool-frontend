import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogicalFrameEditComponent } from './logical-frame-edit.component';

describe('LogicalFrameEditComponent', () => {
  let component: LogicalFrameEditComponent;
  let fixture: ComponentFixture<LogicalFrameEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogicalFrameEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogicalFrameEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
