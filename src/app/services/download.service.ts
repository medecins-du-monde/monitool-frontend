import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ProjectService } from './project.service';
import { IndicatorService } from './indicator.service';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class DownloadService implements OnDestroy {

  url = new BehaviorSubject<string>('');
  status = new BehaviorSubject<string>('waiting');

  private subscription: Subscription = new Subscription();

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
    if (this.url.getValue() !== ''){
      // observe: 'response' makes the get return
      // an observable with the entire response instead of just the body
      this.status.next('generating');

      this.subscription.add(
        this.httpClient.get(this.url.getValue(), {observe: 'response'}).subscribe(resp => {
          // Display its headers

          // const keys = resp.headers.keys();
          // const headers = keys.map(key =>
          //   `${key}: ${resp.headers.get(key)}`);
          // const body = { ...resp.body };
          // console.log(headers)
          // console.log(body)

          // TO DO: add error handling here

          this.check();
        }, err => {
          console.log(err);
          this.check();
        })
      );
    }
  }

  check(): void {
    this.status.next('checking');
    if (this.url.getValue() !== ''){
      this.subscription.add(
        this.httpClient.get(this.url.getValue().split('?')[0] + '/check',  {observe: 'response'}).subscribe(resp => {
          const body = { ...resp.body };

          if (body['message'] === 'done'){
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

  private async getFileName(url: string): Promise<string> {
    let filename = 'error.xlsx';
    const id = url.split('/')[3];
    switch (id.split(':')[0]) {
      case 'indicator':
        console.log();
        await this.indicatorService.get(id).then(res => {
          filename = `(${res.name[this.translateService.currentLang]})-${this.translateService.instant}`;
        });
        break;
      case 'project':

        break;
      default:
        break;
    }
    return filename;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
