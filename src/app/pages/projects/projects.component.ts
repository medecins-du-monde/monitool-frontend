import { Component, OnInit, ViewChild, ChangeDetectorRef, AfterViewChecked, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatOption } from '@angular/material/core';
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
      count: 0,
      checked: true
    },
    {
      text: 'FinishedPlural',
      value: 'Finished',
      count: false
    },
    {
      text: 'DeletedPlural',
      value: 'Deleted',
      count: 0,
      checked: false
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

  filtersForm: FormGroup;
  projects: Project[];
  allProjects: Project[];
  currentUser: User;
  canCreateProject = false;
  pageNumber = 1;
  itemPerPage = 12;
  totalPage = 0;
  totalItem = 0;
  searchText: string;
  loading = true;

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
    private sidenavService: SidenavService,
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
    this.subscription.add(
      this.filtersForm.valueChanges.subscribe()
    );

    this.subscription.add(
      this.authService.currentUser.subscribe((user: User) => {
        this.currentUser = new User(user);
        // validate the user can create a project
        if (this.currentUser.type === 'user') {
          if (['admin', 'project'].includes(this.currentUser.role)) {
            this.canCreateProject = true;
          }
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
    this.projectService.list(
      this.filtersForm.value.statuses.sort(),
      this.pageNumber, this.itemPerPage,
      this.searchText
    ).then((res: any) => {
      this.loading = false;

      this.allProjects = res.result;
      this.totalPage = res.total_page;
      this.totalItem = res.total_item;
      this.setCountProjectStatus(res.categories);
      this.projects = this.allProjects;

      if (this.projects.length === 0) {
        this.pageNumber = 1;
      }

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

    });
  }

  setCountProjectStatus(counter: any) {
    this.statuses[0].count = counter.ongoing;
    this.statuses[1].count = counter.finished;
    this.statuses[2].count = counter.deleted;
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

  onToggleStatus(value: string) {
    this.statuses.forEach(element => {
      if (element.value === value) {
        element.checked = !element.checked;
        if (element.checked === false) {
          element.count = 0;
        }
      }
    });
    this.pageNumber = 1;
    this.getProjects();
  }

  canloadPrevPage(){
    if (this.pageNumber === 1) {
      return false;
    }
    return true;
  }

  canloadNextPage(){
    if (this.pageNumber === this.totalPage) {
      return false;
    }
    return true;
  }

  onSearch(e: any): void {
      this.searchText = e.toLowerCase();
      this.pageNumber = 1;
      this.getProjects();
  }

  paginationChange(e: any) {
    if (e.pageIndex + 1 !== this.pageNumber) {
      this.pageNumber = e.pageIndex + 1;
      this.loading = true;
      this.getProjects();
    }
  }

  private isOwner(user: User) {
    return user.role === 'owner' && user.id === this.currentUser.id;
  }
}
