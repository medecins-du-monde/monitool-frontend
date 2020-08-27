import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThematicsComponent } from './thematics.component';

describe('ThematicsComponent', () => {
  let component: ThematicsComponent;
  let fixture: ComponentFixture<ThematicsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThematicsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThematicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
