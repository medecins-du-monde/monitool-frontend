import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, fakeAsync, tick, flushMicrotasks } from '@angular/core/testing';

import { DownloadService } from './download.service';
import { TranslateModule } from '@ngx-translate/core';
import { ProjectService } from './project.service';
import { IndicatorService } from './indicator.service';
import { DownloadExcelPageComponent } from '../modules/project/modules/reporting/pages/general/download-excel-page/download-excel-page.component';

describe('DownloadService', () => {
  let service: DownloadService;
  let http: HttpTestingController;
  const base = '/api/export/project:1/month/en/true';
  const query = '?filters=' + encodeURIComponent(JSON.stringify({entity: ['a'], _start: '2026-01-01', _end: '2026-02-28'}));

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        TranslateModule.forRoot(),
      ],
      providers: [
        {provide: ProjectService, useValue: {}},
        {provide: IndicatorService, useValue: {}}
      ]
    });
    service = TestBed.inject(DownloadService);
    http = TestBed.inject(HttpTestingController);
    service.url.next(base + query);
  });

  afterEach(() => {
    service.ngOnDestroy();
    http.verify();
  });

  it('downloads a cache hit immediately without polling or a delay', () => {
    const download = spyOn(service, 'download');
    service.generate();
    http.expectOne(base + query).flush({message: 'done', cached: true});
    expect(download).toHaveBeenCalledTimes(1);
    expect(service.status.value).toBe('done');
    http.expectNone(base + '/check' + query);
  });

  it('opens project exports without changing encoded filters or weekly periodicities', async () => {
    const apiUrl = '/api/export/project:1/month_week_mon/fr/false' + query;
    const generate = spyOn(service, 'generate');
    const page = new DownloadExcelPageComponent(
      {updateInformationPanel: jasmine.createSpy('updateInformationPanel')} as any,
      service,
      {} as any,
      {url: '/project/project:1/reporting/general/download?export=' + encodeURIComponent(apiUrl)} as any
    );
    await page.ngOnInit();
    expect(service.url.value).toBe(apiUrl);
    expect(generate).toHaveBeenCalledTimes(1);
    page.ngOnDestroy();
  });

  it('preserves all filters on progress and status requests', fakeAsync(() => {
    spyOn(service, 'download');
    service.generate();
    const generation = http.expectOne(base + query);
    tick(2000);
    http.expectOne(base + '/progress' + query).flush({current: 1, total: 2, percent: 50});
    generation.flush({message: 'not done'});
    http.expectOne(base + '/check' + query).flush({message: 'done'});
    expect(service.status.value).toBe('done');
    tick(2000);
    http.expectNone(base + '/progress' + query);
  }));

  it('regenerates once if the file expires between generation and download', fakeAsync(() => {
    spyOn<any>(service, 'getFileName').and.returnValue(Promise.resolve('report.xlsx'));
    spyOn(URL, 'createObjectURL').and.returnValue('blob:test');
    spyOn(URL, 'revokeObjectURL');
    spyOn(HTMLAnchorElement.prototype, 'click');
    service.generate();
    http.expectOne(base + query).flush({message: 'done'});
    http.expectOne(base + '/file' + query).flush(null, {status: 404, statusText: 'Expired'});
    http.expectOne(base + query).flush({message: 'done'});
    http.expectOne(base + '/file' + query).flush(new Blob(['xlsx']));
    flushMicrotasks();
    expect(HTMLAnchorElement.prototype.click).toHaveBeenCalledTimes(1);
    expect(service.status.value).toBe('done');
  }));

  it('stops after repeated source changes instead of retrying indefinitely', () => {
    service.generate();
    http.expectOne(base + query).flush({}, {status: 409, statusText: 'Project changed'});
    http.expectOne(base + query).flush({}, {status: 409, statusText: 'Project changed'});
    expect(service.status.value).toBe('error');
  });

  it('surfaces generation failures without polling forever', () => {
    service.generate();
    http.expectOne(base + query).flush({}, {status: 500, statusText: 'Generation failed'});
    expect(service.status.value).toBe('error');
  });
});
