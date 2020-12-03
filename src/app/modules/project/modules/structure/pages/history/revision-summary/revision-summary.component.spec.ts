import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisionSummaryComponent } from './revision-summary.component';

describe('RevisionSummary', () => {
  let component: RevisionSummaryComponent;
  let fixture: ComponentFixture<RevisionSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RevisionSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RevisionSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
