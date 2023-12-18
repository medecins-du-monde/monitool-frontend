import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { BasicsInfosGuard } from './basics-infos.guard';

describe('BasicsInfosGuard', () => {
  let guard: BasicsInfosGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule]
    });
    guard = TestBed.inject(BasicsInfosGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
