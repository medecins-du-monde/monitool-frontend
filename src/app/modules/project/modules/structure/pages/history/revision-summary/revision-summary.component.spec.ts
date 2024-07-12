import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Revision } from 'src/app/models/classes/revision.model';

import { RevisionSummaryComponent } from './revision-summary.component';
import { TranslateModule } from '@ngx-translate/core';
const MOCK_REVISIONS: Revision[] = [
  new Revision({ user: 'user1', time: new Date(), backwards: [], forwards: [] }),
  new Revision({ user: 'user2', time: new Date(), backwards: [], forwards: [] }),
  new Revision({ user: 'user3', time: new Date(), backwards: [], forwards: [] }),
];

describe('RevisionSummary', () => {
  let component: RevisionSummaryComponent;
  let fixture: ComponentFixture<RevisionSummaryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [RevisionSummaryComponent],
      imports: [
        HttpClientTestingModule,
        TranslateModule.forRoot(),
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RevisionSummaryComponent);
    component = fixture.componentInstance;
    component.revisions = MOCK_REVISIONS;
    component.revision = MOCK_REVISIONS[0];
    component.index = 0;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
