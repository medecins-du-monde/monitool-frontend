import { Component, OnInit, ViewChild, ChangeDetectorRef, AfterViewChecked, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { v4 as uuid } from 'uuid';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from 'src/app/models/classes/project.model';
import { User } from 'src/app/models/classes/user.model';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import InformationItem from 'src/app/models/interfaces/information-item';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit, OnDestroy, AfterViewChecked {

  countries = [];
  statuses = [
    {
      text: 'OngoingPlural',
      value: 'Ongoing',
      count: 0
    },
    {
      text: 'FinishedPlural',
      value: 'Finished',
      count: 0
    },
    {
      text: 'DeletedPlural',
      value: 'Deleted',
      count: 0
    }
  ];

  informations = [
    {
      res1: 'InformationPanel.Project_list',
      res2: 'InformationPanel.Project_list_description'
    } as InformationItem,
    {
      res1: 'InformationPanel.Project_definition_question',
      res2: 'InformationPanel.Project_definition_response'
    } as InformationItem,
    {
      res1: 'InformationPanel.Project_list_question1',
      res2: 'InformationPanel.Project_list_response1'
    } as InformationItem,
    {
      res1: 'InformationPanel.Project_list_question2',
      res2: 'InformationPanel.Project_list_response2'
    } as InformationItem,
    {
      res1: 'InformationPanel.Project_list_question3',
      res2: 'InformationPanel.Project_list_response3'
    } as InformationItem,
    {
      res1: 'InformationPanel.Project_list_question4',
      res2: 'InformationPanel.Project_list_response4'
    } as InformationItem,
    {
      res1: 'InformationPanel.Project_list_question5',
      res2: 'InformationPanel.Project_list_response5'
    } as InformationItem,
    {
      res1: 'InformationPanel.Project_list_question6',
      res2: 'Information.Project_list_response6'
    } as InformationItem,
    {
      res1: 'Information.Project_list_question7',
      res2: 'InformationPanel.Project_list_response7'
    } as InformationItem
  ];

  filtersForm: FormGroup;
  projects: Project[];
  allProjects: Project[];
  currentUser: User;
  canCreateProject = true;

  private subscription: Subscription = new Subscription();

  @ViewChild('allSelected') private allSelected: MatOption;

  get currentLang(): string{
    return this.translateService.currentLang ? this.translateService.currentLang : this.translateService.defaultLang;
  }

  get selectedCountries(): [] {
    return this.filtersForm.value.countries.filter(countrie => countrie !== '0') as [];
  }

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private translateService: TranslateService,
    private authService: AuthService,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.filtersForm = this.fb.group({
      search: '',
      countries: [['0']],
      themes: [[]],
      statuses: [['Ongoing']]
    });

    this.getProjects();
    this.filtersForm.valueChanges.subscribe(() => {
      this.loadFilteredProjects();
    });

    this.subscription.add(
      this.authService.currentUser.subscribe((user: User) => {
        this.currentUser = new User(user);
        if (this.currentUser.type === 'user' && this.currentUser.role === 'common') {
          this.canCreateProject = false;
        }
      })
    );
    this.projectService.updateInformationPanel(this.informations);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewChecked(): void {
    this.changeDetectorRef.detectChanges();
  }

  public getProjects() {
    this.projectService.list().then((res: Project[]) => {
      this.allProjects = res;
      this.loadFilteredProjects();
      this.countries = [... new Set(res.map(x => x.country)
        .sort((x: string, y: string) => x.toLocaleLowerCase().replace(/[\])}[{(]/g, '').localeCompare(y.toLocaleLowerCase().replace(/[\])}[{(]/g, ''))))];

      if (this.projects) {
        this.projects.sort((a, b) => {
          // If owner of at least one of both project
          if (a.users.find(user => this.isOwner(user))
          || b.users.find(user => this.isOwner(user))
          ) {
            // If owner of both project
            if (a.users.find(user => this.isOwner(user))
            && b.users.find(user => this.isOwner(user))
            ) {
              // alphabetical order
              return a.country.localeCompare(b.country);
            } else if (a.users.find(user => this.isOwner(user))) {
              return -1;
            } else {
              return 1;
            }
          } else if (localStorage.getItem('user::' + this.currentUser.id + 'favorite' + a.id)){
            if (localStorage.getItem('user::' + this.currentUser.id + 'favorite' + b.id)) {
              return a.country.localeCompare(b.country);
            } else {
              return -1;
            }
          } else {
            return 1;
          }
        });
      }

      this.setCountProjectStatus(res);
    });
  }

  setCountProjectStatus(res: Project[]) {
      this.statuses.forEach((value, index) => {
        this.statuses[index].count = res.filter(project => project.status === value.value).length;
      });
  }

  onCreate(): void {
    const project = new Project();
    project.id = `project:${uuid()}`;
    const user = new User({type: 'internal', role: 'owner', id: this.currentUser.id});
    project.users.push(user);
    // Allow user with a project role to access to the structure page to create a project
    this.projectService.projectUserRoleCreateProject.next(true);
    this.projectService.create(project);
    this.router.navigate(['/projects', project.id]);
  }

  onDelete(project: Project): void {
    this.projectService.delete(project.id).then(() => {
      this.getProjects();
    });
  }

  onRestore(project: Project): void {
    this.projectService.restore(project.id).then(() => {
      this.getProjects();
    });
  }

  onClone(project: Project): void {
    this.projectService.clone(project.id).then(() => {
      this.getProjects();
    });
  }

  onToggleCountry() {
    if (this.allSelected.selected) {
      this.allSelected.deselect();
      return;
    }
    if (this.filtersForm.value.countries.length === this.countries.length) {
      this.allSelected.select();
    }
  }

  onToggleAllCountries() {
    if (this.allSelected.selected) {
      // TODO: Change this thing of the 0.
      this.filtersForm.controls.countries
        .setValue(['0']);
    } else {
      this.filtersForm.controls.countries.setValue([]);
    }
  }

  onSearch(e: any): void {
    this.filtersForm.controls.search.setValue(e);
  }

  loadFilteredProjects(): void {
    let filteredProjects = this.filterByText(this.allProjects);
    filteredProjects = this.filterByCountries(filteredProjects);
    filteredProjects = this.filterByStatuses(filteredProjects);
    this.projects = filteredProjects;
  }

  private filterByText(projects: Project[]): Project[] {
    const search = this.filtersForm.value.search.toLowerCase();
    return projects.filter(project =>
      project.name.toLowerCase().includes(search) ||
      project.country.toLowerCase().includes(search) ||
      project.themes.find(theme => theme.shortName[this.currentLang].toLowerCase().includes(search))
    );
  }

  private filterByCountries(projects: Project[]): Project[] {
    const countries = this.filtersForm.value.countries;
    if (countries.length > 0) {
      if (countries.includes('0')) {
        return projects;
      }
      else {
        return projects.filter(project => countries.includes(project.country));
      }
    }
    else {
      return [];
    }
  }

  private filterByStatuses(projects: Project[]): Project[] {
    let filteredProjects = [];
    const statuses = this.filtersForm.value.statuses;
    if (statuses.includes('Ongoing')) {
      filteredProjects = filteredProjects.concat(projects.filter(project => project.status === 'Ongoing'));
    }
    if (statuses.includes('Finished')) {
      filteredProjects = filteredProjects.concat(projects.filter(project => project.status === 'Finished'));
    }
    if (statuses.includes('Deleted')) {
      filteredProjects = filteredProjects.concat(projects.filter(project => project.status === 'Deleted'));
    }
    return filteredProjects;
  }

  private isOwner(user: User) {
    return user.role === 'owner' && user.id === this.currentUser.id;
  }
}
