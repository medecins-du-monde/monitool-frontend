import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {

  url = new BehaviorSubject<string>('');
  status = new BehaviorSubject<string>('waiting');

  constructor(private httpClient: HttpClient) {
    this.url.subscribe(url => {
      console.log(url);
    })
  }

  generate(): void {
    if (this.url.getValue() !== ''){
      // observe: 'response' makes the get return
      // an observable with the entire response instead of just the body
      this.status.next('generating');

      this.httpClient.get(this.url.getValue(), {observe: 'response'}).subscribe(resp => {
        // display its headers
        const keys = resp.headers.keys();
        const headers = keys.map(key =>
          `${key}: ${resp.headers.get(key)}`);

        const body = { ...resp.body! };

        // console.log(headers)
        // console.log(body)
        // TO DO: add error handling here

        this.check();
      }, err => {
        console.log(err);
        this.check();
      });
    }
  }

  check(): void {
    this.status.next('checking');
    if (this.url.getValue() !== ''){
      this.httpClient.get(this.url.getValue() + '/check',  {observe: 'response'}).subscribe(resp => {
        const body = { ...resp.body! };

        if (body['message'] === 'done'){
          this.status.next('done');
          this.download();
        }
        else{
          setTimeout(() => {
            this.check();
          }, 15000);
        }
      })
    }
  }
  download(): void {
    if (this.url.getValue() !== ''){
      window.open(this.url.getValue() + '/file', '_blank');
    }
  }
}
