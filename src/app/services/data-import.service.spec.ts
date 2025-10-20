import { TestBed } from '@angular/core/testing';

import { DataImportService } from './data-import.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DataImportService', () => {
  let service: DataImportService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ]
    });
    service = TestBed.inject(DataImportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
