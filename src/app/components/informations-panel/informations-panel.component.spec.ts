import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationsPanelComponent } from './informations-panel.component';

describe('InformationsPanelComponent', () => {
  let component: InformationsPanelComponent;
  let fixture: ComponentFixture<InformationsPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformationsPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformationsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
