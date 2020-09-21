import { Injectable } from '@angular/core';
import { Indicator } from '../models/indicator.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class IndicatorService {

  constructor(private apiService: ApiService) { }

  public async list() {
    const response = await this.apiService.get('/resources/indicator');
  }

  public async get(id: string) {
    const response = await this.apiService.get(`/resources/indicator/${id}`);
  }

  public async save(indicator: Indicator) {
    const response = await this.apiService.put(`/resources/indicator/${indicator.id}`, indicator);
  }

  public async delete(id: string) {
    const response = await this.apiService.post(`/resources/theme/${id}`);
  }
}
