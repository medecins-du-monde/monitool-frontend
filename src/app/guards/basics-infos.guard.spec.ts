import { TestBed } from '@angular/core/testing';

import { BasicsInfosGuard } from './basics-infos.guard';

describe('BasicsInfosGuard', () => {
  let guard: BasicsInfosGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(BasicsInfosGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
