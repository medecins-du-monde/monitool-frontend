import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {

  constructor(private apiService: ApiService) { }

  public async downloadFile(projectId: string, periodicity='quarter', type='xlxs') {
    return await this.apiService.get(`/export/${projectId}/${periodicity}`);
  }
}
