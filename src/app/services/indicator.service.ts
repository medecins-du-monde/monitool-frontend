import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Indicator } from '../models/indicator.model';
import { ApiService } from './api.service';
import { ThemeService } from './theme.service';

@Injectable({
  providedIn: 'root'
})
export class IndicatorService {
  indicator: BehaviorSubject<Indicator> = new BehaviorSubject(new Indicator());

  constructor(
    private apiService: ApiService,
    private themeService: ThemeService
  ) { }
  get openedIndicator(): Observable<Indicator> {
    return this.indicator.asObservable();
  }
  public async get(id: string) {
    const themes = await this.themeService.list();
    const response: any = await this.apiService.get(`/resources/indicator/${id}`);
    const indicator = new Indicator(response);
    indicator.themes = themes.filter(t => response.themes.indexOf(t.id) >= 0);
    return indicator;
  }

  public async list() {
    const themes = await this.themeService.list();
    const response: any = await this.apiService.get('/resources/indicator');
    return response.map(x => {
      const indicator = new Indicator(x);
      indicator.themes = themes.filter(t => x.themes.indexOf(t.id) >= 0);
      return indicator;
    });
  }

  public async listForProject(themesList: string[]) {
    const indicatorsList = await this.list();
    const result = indicatorsList.filter(indicator => {
      let response = false;
      indicator.themes.forEach( theme => {
       if (themesList.includes(theme.id)) {
         response = true;
        }
      });
      return response;
    });
    return result;
  }

  public async save(indicator: Indicator) {
    const response = await this.apiService.put(`/resources/indicator/${indicator.id}`, indicator.serialize());
  }

  public async delete(id: string) {
    const response = await this.apiService.delete(`/resources/indicator/${id}`);
  }
}
