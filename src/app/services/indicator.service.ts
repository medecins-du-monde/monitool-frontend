import { Injectable } from '@angular/core';
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
    return response.map(x => {
      const indicator = new Indicator(x);
      indicator.themes = themes.filter(t => x.themes.indexOf(t.id) >= 0);
      return indicator;
    });
  }

  public async get(id: string) { // not being used anywhere (?)
    // const response = await this.apiService.get(`/resources/indicator/${id}`);
  }

  public async save(indicator: Indicator) {
    const response = await this.apiService.put(`/resources/indicator/${indicator.id}`, indicator.serialize());
  }

  public async delete(id: string) {
    const response = await this.apiService.delete(`/resources/indicator/${id}`);
  }
}
