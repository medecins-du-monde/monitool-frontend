import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogicalCardComponent } from './logical-card.component';

describe('LogicalCardComponent', () => {
  let component: LogicalCardComponent;
  let fixture: ComponentFixture<LogicalCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogicalCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogicalCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
