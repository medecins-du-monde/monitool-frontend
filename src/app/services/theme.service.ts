import { Injectable } from '@angular/core';
import { Theme } from '../models/classes/theme.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor(private apiService: ApiService) { }

  public async list() {
    const response: any = await this.apiService.get('/resources/theme');
    return response.map(x => new Theme(x));
  }

  public async save(theme: Theme) {
    await this.apiService.put(`/resources/theme/${theme.id}`, theme.serialize());
  }

  public async delete(id: string) {
    await this.apiService.delete(`/resources/theme/${id}`);
  }
}
