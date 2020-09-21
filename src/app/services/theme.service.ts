import { Injectable } from '@angular/core';
import { Theme } from '../models/theme.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor(private apiService: ApiService) { }

  public async list() {
    const response = await this.apiService.get('/resources/theme');
    // return response.map(x => new Theme().deserialize(x));
  }

  public async get(id: string) {
    const response = await this.apiService.get(`/resource/theme/${id}`);
  }

  public async save(theme: Theme) {
    const response = await this.apiService.put(`/resource/theme/${theme.id}`, theme);
  }

  public async delete(id: string) {
    const response = await this.apiService.post(`/resource/theme/${id}`);
  }
}
