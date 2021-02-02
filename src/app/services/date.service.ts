import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  private langValue = new BehaviorSubject(null);

  get currentLang(): Observable<string> {
    return this.langValue.asObservable();
  }

  setCurrentLang(lang: string){
    this.langValue.next(lang);
  }

}
