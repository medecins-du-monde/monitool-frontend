import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeAlertComponent } from './theme-alert.component';

describe('ThemeAlertComponent', () => {
  let component: ThemeAlertComponent;
  let fixture: ComponentFixture<ThemeAlertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThemeAlertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemeAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
