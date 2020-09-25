import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Project } from '../models/project.model';
import { ThemeService } from './theme.service';
import { Projects } from '../mocked/projects.mocked';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  project: BehaviorSubject<Project> = new BehaviorSubject(new Project());

  get openedProject(): Observable<Project> {
    return this.project.asObservable();
  }

  constructor(
    private apiService: ApiService,
    private themeService: ThemeService
  ) {}

  public async list() {
    const themes = await this.themeService.list();
    // const response = await this.apiService.get('/resources/project', { mode: 'short' });
    const response = Projects;
    return response.map(x => {
      const project = new Project(x);
      project.themes = themes.filter(t => x.themes.indexOf(t.id) >= 0);
      return project;
    });
  }

  public async get(id: string) {
    const themes = await this.themeService.list();
    // const response = await this.apiService.get(`/resources/project/${id}`);
    const response = Projects[0];
    const project = new Project(response);
    project.themes = themes.filter(t => response.themes.indexOf(t.id) >= 0);
    return project;
  }

  public async save(project: Project) {
    // const response = await this.apiService.put(`/resources/project/${project.id}`, project);
  }

  public async delete(id: string) {
    // const response = await this.apiService.post(`/resources/project/${id}`);
  }
}
