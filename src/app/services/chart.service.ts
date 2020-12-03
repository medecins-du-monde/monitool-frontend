import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  type = new BehaviorSubject('line');
  currentType = this.type.asObservable();

  options: BehaviorSubject<object> = new BehaviorSubject(new Object());
  currentOptions = this.options.asObservable();

  dataset: BehaviorSubject<object> = new BehaviorSubject(new Object());
  currentDataset = this.dataset.asObservable();


  addDataset(dataset) {
    this.dataset.next(dataset);
  }


  constructor() { }
}
