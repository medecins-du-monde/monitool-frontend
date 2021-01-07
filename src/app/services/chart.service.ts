import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  type = new BehaviorSubject('line');
  currentType = this.type.asObservable();

  dataset: BehaviorSubject<object> = new BehaviorSubject(new Object());
  currentDataset = this.dataset.asObservable();

  data: BehaviorSubject<any> = new BehaviorSubject({});
  currentData = this.data.asObservable();


  addDataset(dataset): void {
    this.dataset.next(dataset);
  }

  addData(data): void {
    this.data.next(data);
  }

  changeType(type): void{
    this.type.next(type);
  }
}
