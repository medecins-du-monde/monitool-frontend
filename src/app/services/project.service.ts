import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Project } from '../models/classes/project.model';
import { ThemeService } from './theme.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Revision } from '../models/classes/revision.model';
import BreadcrumbItem from 'src/app/models/interfaces/breadcrumb-item.model';

@Injectable({
  providedIn: 'root'
})

export class ProjectService{

  private savedProject: Project;
  private currentProject: Project;

  project: BehaviorSubject<Project> = new BehaviorSubject(new Project());

  // It s valid by default because we don t always have to check again if the form is valid. For example when we use the drag and drop
  valid = true;

  // This parameter allows to extend the page
  inBigPage: BehaviorSubject<boolean> = new BehaviorSubject(true);

  // Keep track of if the project has basics info filled out
  basicInfos: BehaviorSubject<boolean> = new BehaviorSubject(true);

  get openedProject(): Observable<Project> {
    return this.project.asObservable();
  }

  get bigPage(): Observable<boolean> {
    return this.inBigPage.asObservable();
  }

  get hasBasicsInfos(): Observable<boolean> {
    return this.basicInfos.asObservable();
  }

  get hasPendingChanges(): boolean{
    return !this.savedProject.equals(this.currentProject);
  }

  breadcrumbList: BreadcrumbItem[];

  constructor(private apiService: ApiService, private themeService: ThemeService) {
    this.openedProject.subscribe( (project: Project) => {
      if (!this.savedProject) {
        this.savedProject = project.copy();
        this.currentProject = project.copy();
      } else {
        if ( project.id !== this.savedProject.id ) {
          this.savedProject = project.copy();
          this.currentProject = project.copy();
        } else {
          this.currentProject = project.copy();
        }
      }

      // Check whether or not the project has its basics infos and display sidenav links accordingly
      if (!project.country || !project.name) {
        this.basicInfos.next(false);
      } else {
        this.basicInfos.next(true);
      }

      this.breadcrumbList = [
        {
          value: 'Projects',
          link: './../../projects'
        } as BreadcrumbItem,
        {
          value: project.country,
        } as BreadcrumbItem,
        {
          value: project.name,
        } as BreadcrumbItem,
      ];
    });
  }

  // used when changing pages and chosing to not save the changes
  public discardPendingChanges(): void {
    this.project = new BehaviorSubject(this.savedProject.copy());
    this.openedProject.subscribe( (project: Project) => {
      if (!this.savedProject) {
        this.savedProject = project.copy();
        this.currentProject = project.copy();
      } else {
        if ( project.id !== this.savedProject.id ) {
          this.savedProject = project.copy();
          this.currentProject = project.copy();
        } else {
          this.currentProject = project.copy();
        }
      }
    });
  }

  // used when reverting changes and staying in the same page
  public revertChanges(): void {
    this.project.next(this.savedProject.copy());
  }

  public async list(): Promise<Project[]>{
    const themes = await this.themeService.list();
    const response: any = await this.apiService.get('/resources/project/?mode=short');
    return response.map(x => {
      const project = new Project(x);
      project.themes = themes.filter(t => x.themes.indexOf(t.id) >= 0);
      return project;
    });
  }

  public create(project: Project): void{
    this.basicInfos.next(false);
    this.project.next(project);
    this.apiService.post(`/resources/project/${project.id}`, project.serialize());
  }

  public async get(id: string): Promise<Project>{
    const themes = await this.themeService.list();
    const response: any = await this.apiService.get(`/resources/project/${id}`);
    const project = new Project(response);
    project.themes = themes.filter(t => response.themes.indexOf(t.id) >= 0);
    return project;
  }

  public async save(project: Project): Promise<Project>{
    const response: any = await this.apiService.put(`/resources/project/${project.id}`, project.serialize());
    const themes = await this.themeService.list();
    const savedProject = new Project(response);
    savedProject.themes = themes.filter(t => response.themes.indexOf(t.id) >= 0);

    this.savedProject = savedProject.copy();
    this.currentProject = savedProject.copy();
    return savedProject;
  }

  public async saveCurrent(): Promise<Project>{
    const project = this.currentProject;
    const response: any = await this.apiService.put(`/resources/project/${project.id}`, project.serialize());
    const themes = await this.themeService.list();
    const savedProject = new Project(response);
    savedProject.themes = themes.filter(t => response.themes.indexOf(t.id) >= 0);

    if (!this.basicInfos) {
      this.basicInfos.next(true);
    }

    this.savedProject = savedProject.copy();
    this.currentProject = savedProject.copy();
    return savedProject;
  }

  public async delete(id: string): Promise<void>{
    const project: any = await this.apiService.get(`/resources/project/${id}`);
    project.active = false;
    await this.apiService.put(`/resources/project/${id}`, project);
  }

  public async restore(id: string): Promise<void>{
    const project: any = await this.apiService.get(`/resources/project/${id}`);
    project.active = true;
    await this.apiService.put(`/resources/project/${id}`, project);
  }

  public async clone(id: string): Promise<void>{
    const project = new Project();
    await this.apiService.put(`/resources/project/${project.id}?from=${id}&with_data=true`);
  }

  public async listRevisions(id: string, limit: number): Promise<Revision[]>{
    const response: any = await this.apiService.get(`/resources/project/${id}/revisions`, {params: { offset: 0, limit } });
    return response.map(x => new Revision(x));
  }

  public async listByIndicator(indicatorId: string): Promise<Project[]>{
    const response: any = await this.apiService.get(`/resources/project`, {params: { mode: 'crossCutting', indicatorId} });
    return response.map(x => new Project(x));
  }
}
