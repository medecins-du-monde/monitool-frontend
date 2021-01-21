import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  private _langValue = new BehaviorSubject(null);
  langValueObs$ = this._langValue.asObservable();

  constructor() { }

  setCurrentLang(lang: string){
    this._langValue.next(lang);
  }

}
