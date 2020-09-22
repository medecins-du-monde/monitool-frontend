import { Injectable } from '@angular/core';
import { Indicators } from '../mocked/indicators.mocked';
import { Indicator } from '../models/indicator.model';
import { ApiService } from './api.service';
import { ThemeService } from './theme.service';

@Injectable({
  providedIn: 'root'
})
export class IndicatorService {

  constructor(
    private apiService: ApiService,
    private themeService: ThemeService
  ) { }

  public async list() {
    const themes = await this.themeService.list();
    const response: any = await this.apiService.get('/resources/indicator');
    const mocked = Indicators;
    return mocked.map(x => {
      const indicator = new Indicator(x);
      indicator.themes = themes.filter(t => t.id in x.themes);
      return indicator;
    });
  }

  public async get(id: string) {
    const response = await this.apiService.get(`/resources/indicator/${id}`);
  }

  public async save(indicator: Indicator) {
    const response = await this.apiService.put(`/resources/indicator/${indicator.id}`, indicator.serialize());
  }

  public async delete(id: string) {
    const response = await this.apiService.post(`/resources/indicator/${id}`);
  }
}
