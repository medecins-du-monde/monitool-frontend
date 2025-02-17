import { Component, OnInit, ViewChild, ChangeDetectorRef, AfterViewChecked, OnDestroy, Renderer2 } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatLegacyOption as MatOption } from '@angular/material/legacy-core';
import { v4 as uuid } from 'uuid';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from 'src/app/models/classes/project.model';
import { User } from 'src/app/models/classes/user.model';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/services/auth.service';
import { SidenavService } from 'src/app/services/sidenav.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import InformationItem from 'src/app/models/interfaces/information-item';
import { CountryListService } from 'src/app/services/country-list.service';

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
      res2: 'InformationPanel.Project_list_response6'
    } as InformationItem,
    {
      res1: 'InformationPanel.Project_list_question7',
      res2: 'InformationPanel.Project_list_response7'
    } as InformationItem
  ];

  filtersForm: UntypedFormGroup;
  projects: Project[];
  allProjects: Project[];
  currentUser: User;
  canCreateProject = true;
  pageNumber = 0;
  totalItem = 0;
  shownProjects: Project[];

  private subscription: Subscription = new Subscription();

  @ViewChild('allSelected') private allSelected: MatOption;

  get currentLang(): string{
    return this.translateService.currentLang ? this.translateService.currentLang : this.translateService.defaultLang;
  }

  public filteredCountryList: any[];
  public get continentList() {
    return this.countryListService.getContinents();
  }

  constructor(
    private fb: UntypedFormBuilder,
    private projectService: ProjectService,
    private translateService: TranslateService,
    private authService: AuthService,
    private sidenavService: SidenavService,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef,
    private countryListService: CountryListService,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.filteredCountryList = this.countryListService.getCountries();
    this.filtersForm = this.fb.group({
      search: '',
      continents: [[]],
      countries: [[]],
      themes: [[]],
      statuses: [['Ongoing']]
    });

    this.getProjects();
    this.subscription.add(
      this.filtersForm.valueChanges.subscribe(() => {
        this.loadFilteredProjects();
        this.pageNumber = 0;
        this.setPagination();
      })
    );

    this.subscription.add(
      this.authService.currentUser.subscribe((user: User) => {
        this.currentUser = new User(user);
        if (this.currentUser.type === 'user' && this.currentUser.role === 'common') {
          this.canCreateProject = false;
        }
      })
    );
    this.projectService.updateInformationPanel(this.informations);
    this.projectService.needsInfosPanelSpace.next(true);
  }

  ngOnDestroy(): void {
    this.projectService.needsInfosPanelSpace.next(false);
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
        this.setPagination();
      }
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
    this.sidenavService.generateSidenav(this.currentUser, project);
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

  onCloneWithData(project: Project): void {
    this.projectService.cloneWithData(project.id).then(() => {
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
    this.setCountProjectStatus(filteredProjects);
    filteredProjects = this.filterByStatuses(filteredProjects);
    this.projects = filteredProjects;
  }

  paginationChange(e: any) {
    if (e.pageIndex !== this.pageNumber) {
      this.pageNumber = e.pageIndex;
      this.setPagination();
    }
  }

  private filterByText(projects: Project[]): Project[] {
    const search = this.filtersForm.value.search.toLowerCase();
    const filteredCountryList = this.countryListService.getCountries(undefined, this.filtersForm.get('continents').value, search);
    console.log(filteredCountryList);
    return projects.filter(project =>
      project.name.toLowerCase().includes(search) ||
      project.region && project.region.toLowerCase().includes(search) ||
      project.themes.find(theme => theme.shortName[this.currentLang].toLowerCase().includes(search)) ||
      filteredCountryList.find(country => country.key === project.country) || project.country.includes(search)
    );
  }

  private filterByCountries(projects: Project[]): Project[] {
    if (this.filtersForm.value.countries.length <= 0 && this.filtersForm.value.continents.length <= 0) {
      return projects;
    }
    // return projects.filter(project => project.country === this.filtersForm.value.country);
    const countries = this.filtersForm.value.countries;
    const continents = this.filtersForm.value.continents;
    if (continents.length <= 0) {
      return projects.filter(project => countries.includes(project.country));
    }
    else if (countries.length <= 0) {
      return projects.filter(project => continents.includes(project.continent));
    } else {
      return projects.filter(project =>
        countries.includes(project.country) && continents.includes(project.continent)
      );
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

  private setPagination() {
    this.totalItem = this.projects.length;
    this.shownProjects = this.projects.slice(this.pageNumber * 12, this.pageNumber * 12 + 12);
  }

  onSearchCountry(value = '') {
    this.filteredCountryList = this.countryListService.getCountries(null, this.filtersForm.get('continents').value, value.toLowerCase(), this.filtersForm.get('countries').value);
  }

  resetCountryInput(event: boolean, element: HTMLElement) {
    if (!event) {
      this.renderer.setProperty(element, 'value', '');
      this.onSearchCountry('');
    }
  }

  resetCountrySearch(event: boolean) {
    if (event) return;
    const continents = this.filtersForm.get('continents').value;
    const countries = this.filtersForm.get('countries').value;
    if (continents.length > 0 && countries.length > 0) {
      const newCountries: string[] = [];
      countries.forEach(key => {
        if (continents.includes(this.countryListService.getCountry(key).continent)) {
          newCountries.push(key);
        }
      })
      this.filtersForm.get('countries').patchValue(newCountries);
    }
    this.onSearchCountry();
  }
}
