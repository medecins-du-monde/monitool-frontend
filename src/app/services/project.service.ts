import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Project } from '../models/classes/project.model';
import { ThemeService } from './theme.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Revision } from '../models/classes/revision.model';
import { filter } from 'rxjs/operators';
import BreadcrumbItem from '../models/interfaces/breadcrumb-item.model';

@Injectable({
  providedIn: 'root'
})

export class ProjectService {

  private savedProject: Project;
  private currentProject: Project;

  project: BehaviorSubject<Project> = new BehaviorSubject(new Project());
  breadCrumbs: BehaviorSubject<BreadcrumbItem[]> = new BehaviorSubject([]);

  // It s valid by default because we don t always have to check again if the form is valid. For example when we use the drag and drop
  valid = true;

  // This parameter allows to extend the page
  inBigPage: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  // Keep track of if the project has basics info filled out
  basicInfos: BehaviorSubject<boolean> = new BehaviorSubject(false);

  // Get project id to redirect MDM Accounts
  projectId: BehaviorSubject<string> = new BehaviorSubject('');

  // Check if a project user is creating a new project
  projectUserRoleCreateProject: BehaviorSubject<boolean> = new BehaviorSubject(false);

  get openedProject(): Observable<Project> {
    return this.project.asObservable().pipe(filter(p => !!p));
  }

  get bigPage(): Observable<boolean> {
    return this.inBigPage.asObservable();
  }

  get hasBasicsInfos(): Observable<boolean> {
    return this.basicInfos.asObservable();
  }

  get hasPendingChanges(): boolean {
    return this.currentProject && !this.savedProject.equals(this.currentProject);
  }

  get getBreadcrumbsList(): Observable<any[]> {
    return this.breadCrumbs.asObservable();
  }

  get getProjectId(): Observable<string> {
    return this.projectId.asObservable();
  }

  get projectUserCreatingProject(): Observable<boolean> {
    return this.projectUserRoleCreateProject.asObservable();
  }

  constructor(private apiService: ApiService, private themeService: ThemeService) {
    this.openedProject.subscribe((project: Project) => {
      if (!this.savedProject) {
        this.savedProject = project.copy();
        this.currentProject = project.copy();
      } else {
        if (project.id !== this.savedProject.id) {
          this.savedProject = project.copy();
          this.currentProject = project.copy();
        } else {
          this.currentProject = project.copy();
        }
      }
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

  // Update the breadcrumbs list
  public updateBreadCrumbs(list: BreadcrumbItem[]): void {
    this.breadCrumbs.next(list);
  }

  // used when reverting changes and staying in the same page
  public revertChanges(): void {
    this.project.next(this.savedProject.copy());
  }

  public async list(): Promise<Project[]> {
    const themes = await this.themeService.list();
    const response: any = await this.apiService.get('/resources/project/?mode=short');
    return response.map(x => {
      const project = new Project(x);
      project.themes = themes.filter(t => x.themes.indexOf(t.id) >= 0);
      return project;
    });
  }

  public create(project: Project): void {
    this.basicInfos.next(false);
    this.project.next(project);
    this.apiService.post(`/resources/project/${project.id}`, project.serialize());
  }

  public async get(id: string): Promise<Project> {
    const themes = await this.themeService.list();
    const response: any = await this.apiService.get(`/resources/project/${id}`);
    const project = new Project(response);

    // Check whether or not the project has its basics infos and display sidenav links accordingly
    if (!project.country || !project.name) {
      this.basicInfos.next(false);
    } else {
      this.basicInfos.next(true);
    }
    project.themes = themes.filter(t => response.themes.indexOf(t.id) >= 0);
    this.project.next(project);
    this.savedProject = project.copy();
    this.currentProject = project.copy();
    return project;
  }

  public async saveCurrent(): Promise<Project>{
    const project = this.currentProject;
    const response: any = await this.apiService.put(`/resources/project/${project.id}`, project.serialize());
    const themes = await this.themeService.list();
    const savedProject = new Project(response);
    savedProject.themes = themes.filter(t => response.themes.indexOf(t.id) >= 0);
    // If there is a response, that means that at least the basics informations have been sent
    if (response && !this.basicInfos.getValue()) {
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

  public async restore(id: string): Promise<void> {
    const project: any = await this.apiService.get(`/resources/project/${id}`);
    project.active = true;
    await this.apiService.put(`/resources/project/${id}`, project);
  }

  public async clone(id: string): Promise<void> {
    const project = new Project();
    await this.apiService.put(`/resources/project/${project.id}?from=${id}&with_data=true`);
  }

  public async listRevisions(id: string, limit: number): Promise<Revision[]> {
    const response: any = await this.apiService.get(`/resources/project/${id}/revisions`, { params: { offset: 0, limit } });
    return response.map(x => new Revision(x));
  }

  public async listByIndicator(indicatorId: string): Promise<Project[]> {
    const response: any = await this.apiService.get(`/resources/project`, { params: { mode: 'crossCutting', indicatorId } });
    return response.map(x => new Project(x));
  }

  // Used when the user is a partner with a data entry role to display the name
  // of datasource and entities from their ID
  public getNamefromId(id, arr): string {
    let name;
    arr.forEach(x => {
      if (x.id === id) {
        name = x.name;
      }
    });
    return name;
  }

  public updateProjectId(id: string) {
    this.projectId.next(id);
  }
}
