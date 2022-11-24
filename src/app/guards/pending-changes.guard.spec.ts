import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';

import { PendingChangesGuard } from './pending-changes.guard';

describe('PendingChangesGuard', () => {
  let guard: PendingChangesGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, TranslateModule.forRoot()]
    });
    guard = TestBed.inject(PendingChangesGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
