import { TestBed } from '@angular/core/testing';

import { AppVersionService } from './app-version.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { ServiceWorkerModule } from '@angular/service-worker';

describe('AppVersionService', () => { 
  let service: AppVersionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatDialogModule,
        ServiceWorkerModule.register('ngsw-worker.js', { enabled: true }),
      ]
    });
    service = TestBed.inject(AppVersionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
