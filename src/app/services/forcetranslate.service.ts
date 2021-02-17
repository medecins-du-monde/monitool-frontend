import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

// This service is used when we need to have a translation in a language different than the current one
export class ForceTranslateService {

    constructor(private http: HttpClient) { }

    getData(lang: string) {
        return this.http.get('/assets/i18n/' + lang + '.json');
    }
}
