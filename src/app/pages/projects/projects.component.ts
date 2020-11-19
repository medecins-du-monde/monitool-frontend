import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from 'src/app/models/project.model';
import { User } from 'src/app/models/user.model';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  countries = [];
  statuses = [
    {
      text: 'OngoingPlural',
      value: 'Ongoing'
    },
    {
      text: 'FinishedPlural',
      value: 'Finished'
    },
    {
      text: 'DeletedPlural',
      value: 'Deleted'
    }
  ];

  filtersForm: FormGroup;
  projects: Project[];
  allProjects: Project[];
  currentUser : User;

  @ViewChild('allSelected') private allSelected: MatOption;

  get currentLang() {
    return this.translateService.currentLang ? this.translateService.currentLang : this.translateService.defaultLang;
  }

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private translateService: TranslateService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.filtersForm = this.fb.group({
      search: '',
      countries: [[]],
      themes: [[]],
      statuses: [['Ongoing']]
    });
    this.getProjects();
    this.filtersForm.valueChanges.subscribe(() => {
      this.onFilterChange();
    });

    this.authService.currentUser.subscribe((user: User) => {
      this.currentUser = user;
    });
  }

  public getProjects() {
    this.projectService.list().then((res: Project[]) => {
      this.allProjects = res;
      this.countries = [... new Set(res.map(x => x.country))];
      this.filtersForm.controls.countries.setValue(this.countries.concat(['0']));
      // this.projects = this.filterByStatuses(this.allProjects);
      this.projects.sort((a,b) => {
        if (a.users.find(user => user.role === "owner") ||(b.users.find(user => user.role === "owner"))) {
          if (a.users.find(user => user.role === "owner") && (b.users.find(user => user.role === "owner"))) {
            return a.name.localeCompare(b.name);
          } else if (a.users.find(user => user.role === "owner")) {
            return -1;
          } else {
            return 1;
          }
        } else if (localStorage.getItem('user::'+this.currentUser.id +"favorite"+a.id)){
          if (localStorage.getItem('user::'+this.currentUser.id +"favorite"+b.id)) {
            return a.name.localeCompare(b.name);
          } else {
            return -1;
          }
        } else {
          return 1;
        }
      });
    });
  }

  onCreate(): void {
    let project = new Project();
    const user = new User({type: "internal", role: "owner"});
    project.users.push(user);
    this.projectService.create(project);
    this.router.navigate(['/project', project.id]);
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
      this.filtersForm.controls.countries
        .setValue([...this.countries, '0']);
    } else {
      this.filtersForm.controls.countries.setValue([]);
    }
  }

  onSearch(e: any): void {
    this.filtersForm.controls.search.setValue(e);
  }

  onFilterChange(): void {
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
      return projects.filter(project => countries.includes(project.country));
    } else {
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
}
