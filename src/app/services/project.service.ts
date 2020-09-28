import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Project } from '../models/project.model';
import { ThemeService } from './theme.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Revisions } from '../mocked/revisions.mocked';
import { Revision } from '../models/revision.model';

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
    const response: any = await this.apiService.get('/resources/project', { mode: 'short' });
    // const response = Projects;
    return response.map(x => {
      const project = new Project(x);
      project.themes = themes.filter(t => x.themes.indexOf(t.id) >= 0);
      return project;
    });
  }

  public async get(id: string) {
    const themes = await this.themeService.list();
    const response: any = await this.apiService.get(`/resources/project/${id}`);
    // const response = Projects[0];
    const project = new Project(response);
    project.themes = themes.filter(t => response.themes.indexOf(t.id) >= 0);
    return project;
  }

  public async save(project: Project) {
    const response = await this.apiService.put(`/resources/project/${project.id}`, project.serialize());
  }

  public async delete(id: string) {
    // const response = await this.apiService.post(`/resources/project/${id}`);
  }

  public async listRevisions(id: string, offset: number, limit: number) {
    // const response: any = await this.apiService.get(`/resources/project/${id}/revisions`, { offset, limit });
    const response = Revisions;
    return response.map(x => new Revision(x));
  }
}
