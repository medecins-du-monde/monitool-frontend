import { Injectable } from '@angular/core';
import { Theme, ThemeType } from '../models/classes/theme.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor(private apiService: ApiService) { }

  public async list(type: ThemeType | 'all' = 'theme') {
    const response: any = await this.apiService.get('/resources/theme');
    return response.filter(x => type === 'all' || x.type === type).map(x => new Theme(x));
  }

  public async save(theme: Theme) {
    await this.apiService.put(`/resources/theme/${theme.id}`, theme.serialize());
  }

  public async delete(id: string) {
    await this.apiService.delete(`/resources/theme/${id}`);
  }
}
