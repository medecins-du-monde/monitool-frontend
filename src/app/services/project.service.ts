import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Project } from '../models/project.model';
import { ThemeService } from './theme.service';
import { Projects } from '../mocked/projects.mocked';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(
    private apiService: ApiService,
    private themeService: ThemeService
  ) {}

  public async list() {
    const themes = await this.themeService.list();
    const response = await this.apiService.get('/resources/project', { mode: 'short' });
    const mocked = Projects;
    return mocked.map(x => {
      const project = new Project(x);
      project.themes = themes.filter(t => x.themes.indexOf(t.id) >= 0);
      return project;
    });
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
