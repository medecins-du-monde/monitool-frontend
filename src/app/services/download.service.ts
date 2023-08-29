import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {

  url = new BehaviorSubject<string>('');
  status = new BehaviorSubject<string>('waiting');

  private subscription: Subscription = new Subscription();

  constructor(private httpClient: HttpClient) {
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

  download(): void {
    if (this.url.getValue() !== ''){
      window.open(this.url.getValue().split('?')[0] + '/file', '_blank');
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
