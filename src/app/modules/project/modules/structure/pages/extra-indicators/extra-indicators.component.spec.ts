import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtraIndicatorsComponent } from './extra-indicators.component';

describe('ExtraIndicatorsComponent', () => {
  let component: ExtraIndicatorsComponent;
  let fixture: ComponentFixture<ExtraIndicatorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtraIndicatorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtraIndicatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
