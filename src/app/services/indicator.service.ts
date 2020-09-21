import { Injectable } from '@angular/core';
import { Indicator } from '../models/indicator.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class IndicatorService {

  constructor(private apiService: ApiService) { }

  public async list() {
    const response: any = await this.apiService.get('/resources/indicator');
    return response.map(x => new Indicator(x));
  }

  public async get(id: string) {
    const response = await this.apiService.get(`/resources/indicator/${id}`);
  }

  public async save(indicator: Indicator) {
    const response = await this.apiService.put(`/resources/indicator/${indicator.id}`, indicator.serialize());
  }

  public async delete(id: string) {
    const response = await this.apiService.post(`/resources/theme/${id}`);
  }
}
