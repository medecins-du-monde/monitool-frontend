import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {

  url = new BehaviorSubject<string>('');

  constructor() { 
    this.url.subscribe(url => {
      console.log(url);
    })
  }

  download(): void {
    if (this.url.getValue() !== ''){
      window.open(this.url.getValue() + '/check', '_blank');
    }
  }
}
