import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrossCuttingComponent } from './cross-cutting.component';

describe('CrossCuttingComponent', () => {
  let component: CrossCuttingComponent;
  let fixture: ComponentFixture<CrossCuttingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrossCuttingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrossCuttingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
