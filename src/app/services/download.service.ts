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

  private subscription: Subscription = new Subscription();
  private progressTimer: ReturnType<typeof setTimeout> | null = null;

  constructor(
      private httpClient: HttpClient,
      private projectService: ProjectService,
      private indicatorService: IndicatorService,
      private translateService: TranslateService
    ) {
    this.subscription.add(
      this.url.subscribe(url => {
        console.log(url);
      })
    );
  }

  generate(): void {
    console.log('generate?')
    if (this.url.getValue() !== ''){
      this.progress.next({ current: 0, total: 0, percent: 0 });
      this.status.next('generating');
      this.startProgressPolling();

      this.subscription.add(
        this.httpClient.get(this.url.getValue(), {observe: 'response'}).subscribe(resp => {
          this.check();
        }, err => {
          console.log(err);
          this.check();
        })
      );
    }
  }

  check(): void {
    this.stopProgressPolling();
    this.status.next('checking');
    if (this.url.getValue() !== ''){
      this.subscription.add(
        this.httpClient.get(this.url.getValue().split('?')[0] + '/check',  {observe: 'response'}).subscribe(resp => {
          const body = { ...resp.body };

          if (body['message'] === 'done'){
            this.progress.next({ current: 1, total: 1, percent: 100 });
            this.status.next('done');
            setTimeout(() => {
              this.download();
            }, 1000);
          }
          else{
            setTimeout(() => {
              this.check();
            }, 15000);
          }
        })
      );
    }
  }

  async download(): Promise<void> {
    if (this.url.getValue() !== '') {
      const fileUrl = this.url.getValue().split('?')[0];
      this.httpClient.get(fileUrl + '/file', { responseType: 'blob', observe: 'response' }).subscribe(async resp => {
        const url = window.URL.createObjectURL(resp.body);
        const a = document.createElement('a');
        a.href = url;
        a.download = await this.getFileName(fileUrl);
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();
      });
    }
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
    this.httpClient.get<DownloadProgress>(baseUrl + '/progress').subscribe({
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
    this.subscription.unsubscribe();
  }
}
