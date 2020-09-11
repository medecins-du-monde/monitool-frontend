import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrossCuttingIndicatorComponent } from './cross-cutting-indicator.component';

describe('CrossCuttingIndicatorComponent', () => {
  let component: CrossCuttingIndicatorComponent;
  let fixture: ComponentFixture<CrossCuttingIndicatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrossCuttingIndicatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrossCuttingIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
