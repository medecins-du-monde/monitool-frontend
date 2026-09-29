import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ProjectService } from './project.service';
import { IndicatorService } from './indicator.service';
import { TranslateService } from '@ngx-translate/core';

export interface DownloadProgress {
  current: number;
  total: number;
  percent: number;
}

@Injectable({
  providedIn: 'root'
})
export class DownloadService implements OnDestroy {

  url = new BehaviorSubject<string>('');
  status = new BehaviorSubject<string>('waiting');
  progress = new BehaviorSubject<DownloadProgress>({ current: 0, total: 0, percent: 0 });

  private checkTimer: ReturnType<typeof setTimeout> | null = null;
  private generationStarted = 0;
  private retries = 0;

  private subscription: Subscription = new Subscription();
  private progressTimer: ReturnType<typeof setTimeout> | null = null;

  constructor(
      private httpClient: HttpClient,
      private projectService: ProjectService,
      private indicatorService: IndicatorService,
      private translateService: TranslateService
    ) {}

  generate(retry = false): void {
    if (!this.url.getValue()) return;
    if (!retry) this.retries = 0;
    this.generationStarted = Date.now();
    if (this.checkTimer !== null) clearTimeout(this.checkTimer);
    this.progress.next({ current: 0, total: 0, percent: 0 });
    this.status.next('generating');
    this.startProgressPolling();
    this.subscription.add(this.httpClient.get<{message: string}>(this.url.getValue()).subscribe({
      next: body => body.message === 'done' ? this.complete() : this.check(),
      error: error => {
        if (error.status === 409) this.retryGeneration();
        else if ([0, 502, 504].includes(error.status)) this.check();
        else this.fail();
      }
    }));
  }

  /** Keep the complete criteria on every status and file request. */
  private endpoint(action: string): string {
    const [base, query] = this.url.getValue().split('?');
    return base.replace(/\/$/, '') + '/' + action + (query ? '?' + query : '');
  }

  check(): void {
    this.stopProgressPolling();
    this.status.next('checking');
    this.subscription.add(this.httpClient.get<{message: string}>(this.endpoint('check')).subscribe({
      next: body => {
        if (body.message === 'done') this.complete();
        else if (Date.now() - this.generationStarted < 15 * 60 * 1000) {
          this.checkTimer = setTimeout(() => this.check(), 2000);
        } else this.fail();
      },
      error: () => this.fail()
    }));
  }

  private complete(): void {
    this.stopProgressPolling();
    this.progress.next({ current: 1, total: 1, percent: 100 });
    this.status.next('done');
    this.download();
  }

  private fail(): void {
    this.stopProgressPolling();
    if (this.checkTimer !== null) clearTimeout(this.checkTimer);
    this.status.next('error');
  }

  private retryGeneration(): void {
    if (this.retries++ < 1) this.generate(true);
    else this.fail();
  }

  async download(): Promise<void> {
    if (!this.url.getValue()) return;
    const fileUrl = this.url.getValue().split('?')[0];
    this.subscription.add(this.httpClient.get(this.endpoint('file'), { responseType: 'blob' }).subscribe({
      next: async blob => {
        try {
          const filename = await this.getFileName(fileUrl);
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = filename;
          a.click();
          window.URL.revokeObjectURL(url);
          a.remove();
        } catch { this.fail(); }
      },
      error: error => {
        if ([404, 409].includes(error.status)) this.retryGeneration();
        else this.fail();
      }
    }));
  }

  private startProgressPolling(): void {
    this.stopProgressPolling();
    this.scheduleProgressPoll();
  }

  private scheduleProgressPoll(): void {
    this.progressTimer = setTimeout(() => this.pollProgressOnce(), 2000);
  }

  private pollProgressOnce(): void {
    const baseUrl = this.url.getValue().split('?')[0];
    if (!baseUrl || this.status.getValue() !== 'generating') return;
    this.httpClient.get<DownloadProgress>(this.endpoint('progress')).subscribe({
      next: data => {
        this.progress.next(data);
        if (this.status.getValue() === 'generating') this.scheduleProgressPoll();
      },
      error: () => {
        if (this.status.getValue() === 'generating') this.scheduleProgressPoll();
      }
    });
  }

  private stopProgressPolling(): void {
    if (this.progressTimer !== null) {
      clearTimeout(this.progressTimer);
      this.progressTimer = null;
    }
  }

  private async getFileName(url: string): Promise<string> {
    let name = 'error';
    const parameters = url.split('/');
    if (parameters[2] === 'export-newCC') {
      return `${this.translateService.instant('cross-cutting-export')} (${new Date().toLocaleDateString('en-GB', {year: 'numeric', month: 'numeric', day: 'numeric'})}).xlsx`
    }

    const id = parameters[3];
    const minimized = parameters[6] === 'true';
    if (id.split(':')[0] === 'indicator') {
      await this.indicatorService.get(id).then(res => {
        name = res.name[this.translateService.currentLang];
      });
    } else if (id.split(':')[0] === 'project') {
      await this.projectService.get(id).then(res => { name = res.countries.join(', '); });
    }
    return `(${name})-${this.translateService.instant(minimized ? 'export-minimized' : 'export-complete').toLowerCase().replaceAll(/\s+/g, '-')}.xlsx`;
  }

  ngOnDestroy(): void {
    this.stopProgressPolling();
    if (this.checkTimer !== null) clearTimeout(this.checkTimer);
    this.subscription.unsubscribe();
  }
}
