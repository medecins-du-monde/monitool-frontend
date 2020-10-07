import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Project } from '../models/project.model';
import { ThemeService } from './theme.service';
import { BehaviorSubject, Observable } from 'rxjs';
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
    return response.map(x => {
      const project = new Project(x);
      project.themes = themes.filter(t => x.themes.indexOf(t.id) >= 0);
      return project;
    });
  }

  public async get(id: string) {
    const themes = await this.themeService.list();
    const response: any = await this.apiService.get(`/resources/project/${id}`);
    const project = new Project(response);
    project.themes = themes.filter(t => response.themes.indexOf(t.id) >= 0);
    return project;
  }

  public async save(project: Project) {
    const response: any = await this.apiService.put(`/resources/project/${project.id}`, project.serialize());
    const themes = await this.themeService.list();
    const savedProject = new Project(response);
    savedProject.themes = themes.filter(t => response.themes.indexOf(t.id) >= 0);
    return savedProject;
  }

  public async delete(id: string) {
    const project: any = await this.apiService.get(`/resources/project/${id}`);
    project.active = false;
    await this.apiService.put(`/resources/project/${id}`, project);
  }

  public async restore(id: string) {
    const project: any = await this.apiService.get(`/resources/project/${id}`);
    project.active = true;
    await this.apiService.put(`/resources/project/${id}`, project);
  }

  public async clone(id: string) {
    const project = new Project();
    await this.apiService.put(`/resources/project/${project.id}?from=${id}&with_data=true`);
  }

  public async listRevisions(id: string, offset: number, limit: number) {
    const response: any = await this.apiService.get(`/resources/project/${id}/revisions`, { params: { offset, limit } });
    return response.map(x => new Revision(x));
  }

  public alterProject(project: Project){
    this.project.next(project);
  }
}
