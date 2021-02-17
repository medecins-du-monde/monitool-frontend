import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ForceTranslateService {

    constructor(private http: HttpClient) { }

    getData(lang: string) {
        return this.http.get('/assets/i18n/' + lang + '.json');
    }
}
