import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtraIndicatorsModelComponent } from './extra-indicators-model.component';

describe('ExtraIndicatorsModelComponent', () => {
  let component: ExtraIndicatorsModelComponent;
  let fixture: ComponentFixture<ExtraIndicatorsModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtraIndicatorsModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtraIndicatorsModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
