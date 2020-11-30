import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectGroupingComponent } from './object-grouping.component';

describe('ObjectGroupingComponent', () => {
  let component: ObjectGroupingComponent;
  let fixture: ComponentFixture<ObjectGroupingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjectGroupingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectGroupingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
