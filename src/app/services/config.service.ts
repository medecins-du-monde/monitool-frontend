import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(private apiService: ApiService) { }

  public async getConfig() {
    return await this.apiService.get('/config');
  }
}
