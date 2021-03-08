import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  type = new BehaviorSubject('line');
  currentType = this.type.asObservable();

  data: BehaviorSubject<any> = new BehaviorSubject({});
  reset: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentData = this.data.asObservable();


  addData(data): void {
    this.data.next(data);
  }

  changeType(type): void{
    this.type.next(type);
  }

  clearChart(): void{
    this.data.next({});
  }
}
