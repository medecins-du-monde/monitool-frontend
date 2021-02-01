import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  loading: BehaviorSubject<boolean>;

  get loaded(): Observable<boolean> {
    return this.loading.asObservable();
  }

  constructor() {
    this.loading = new BehaviorSubject(false);
  }

  show(): void {
    this.loading.next(true);
  }

  hide(): void {
    this.loading.next(false);
  }
}
