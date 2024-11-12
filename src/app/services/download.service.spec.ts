import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { DownloadService } from './download.service';
import { TranslateModule } from '@ngx-translate/core';

describe('DownloadService', () => {
  let service: DownloadService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        TranslateModule.forRoot(),
      ]
    });
    service = TestBed.inject(DownloadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
