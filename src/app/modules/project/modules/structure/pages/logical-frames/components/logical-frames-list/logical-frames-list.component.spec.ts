import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogicalFramesListComponent } from './logical-frames-list.component';

describe('LogicalFramesListComponent', () => {
  let component: LogicalFramesListComponent;
  let fixture: ComponentFixture<LogicalFramesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogicalFramesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogicalFramesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
