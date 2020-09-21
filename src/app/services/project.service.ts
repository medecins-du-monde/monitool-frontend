import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Project } from '../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private apiService: ApiService) {}

  public async list() {
    const response = await this.apiService.get('/resources/project', { mode: 'short' });
    // return response.map(x => new project().deserialize(x));
  }

  public async get(id: string) {
    const response = await this.apiService.get(`/resources/project/${id}`);
  }

  public async save(project: Project) {
    const response = await this.apiService.put(`/resources/project/${project.id}`, project);
  }

  public async delete(id: string) {
    const response = await this.apiService.post(`/resources/project/${id}`);
  }
}
