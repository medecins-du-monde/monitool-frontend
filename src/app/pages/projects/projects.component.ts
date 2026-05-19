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
  currentUser: User;
  canCreateProject = true;
  pageNumber = 0;
  totalItem = 0;
  shownProjects: Project[] = [];
  showWarning = true;
  loading = false;

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

    this.loadProjects();
    this.subscription.add(
      this.filtersForm.valueChanges.subscribe(() => {
        this.pageNumber = 0;
        this.loadProjects();
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
    this.loadProjects();
  }

  private async loadProjects(): Promise<void> {
    this.loading = true;
    const { search, continents, countries, statuses } = this.filtersForm.value;
    const { items, total, statusCounts } = await this.projectService.list({
      skip: this.pageNumber * 12,
      limit: 12,
      continents,
      countries,
      statuses,
      search
    });

    // items.sort((a: Project, b: Project) => {
    //   if (a.users.find((user: User) => this.isOwner(user)) || b.users.find((user: User) => this.isOwner(user))) {
    //     if (a.users.find((user: User) => this.isOwner(user)) && b.users.find((user: User) => this.isOwner(user))) {
    //       return (a.countries[0] ?? '').localeCompare(b.countries[0] ?? '');
    //     }
    //     return a.users.find((user: User) => this.isOwner(user)) ? -1 : 1;
    //   }
    //   if (localStorage.getItem('user::' + this.currentUser.id + 'favorite' + a.id)) {
    //     return localStorage.getItem('user::' + this.currentUser.id + 'favorite' + b.id)
    //       ? (a.countries[0] ?? '').localeCompare(b.countries[0] ?? '') : -1;
    //   }
    //   return 1;
    // });

    this.shownProjects = items;
    this.totalItem = total;
    this.statuses.forEach(s => { s.count = statusCounts[s.value] ?? 0; });
    this.loading = false;
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

  onSearch(e: any): void {
    this.filtersForm.controls.search.setValue(e);
  }

  paginationChange(e: any) {
    if (e.pageIndex !== this.pageNumber) {
      this.pageNumber = e.pageIndex;
      this.loadProjects();
    }
  }

  private isOwner(user: User) {
    return user.role === 'owner' && user.id === this.currentUser.id;
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
