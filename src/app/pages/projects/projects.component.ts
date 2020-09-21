import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Project } from 'src/app/models/project';
import { projectsList } from 'src/app/constants/projects';
import { MatOption } from '@angular/material/core';
import { ThemeService } from 'src/app/services/theme.service';
import { Theme } from 'src/app/models/theme.model';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  countries = ['Burkina Faso', 'Italie', 'Inde'];
  themes = ['Theme 1', 'Theme 2'];
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

  @ViewChild('allSelected') private allSelected: MatOption;

  constructor(private fb: FormBuilder, private themeService: ThemeService) {}

  ngOnInit(): void {
    const theme = new Theme();
    this.themeService.save(theme);
    this.filtersForm = this.fb.group({
      search: '',
      countries: [this.countries.concat(['0'])],
      themes: [[]],
      statuses: [['Ongoing']]
    });
    this.projects = this.filterByStatuses(projectsList);
    this.filtersForm.valueChanges.subscribe(() => {
      console.log('filter');
      this.onFilterChange();
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
    let filteredProjects = this.filterByText(projectsList);
    filteredProjects = this.filterByCountries(filteredProjects);
    filteredProjects = this.filterByStatuses(filteredProjects);
    this.projects = filteredProjects;
  }

  private filterByText(projects: Project[]): Project[] {
    const search = this.filtersForm.value.search.toLowerCase();
    return projects.filter(project =>
      project.name.toLowerCase().includes(search) ||
      project.country.toLowerCase().includes(search) ||
      project.themes.find(theme => theme.toLowerCase().includes(search))
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
      filteredProjects = filteredProjects.concat(projects.filter(project => project.active && project.end > new Date()));
    }
    if (statuses.includes('Finished')) {
      filteredProjects = filteredProjects.concat(projects.filter(project => project.active && project.end <= new Date()));
    }
    if (statuses.includes('Deleted')) {
      filteredProjects = filteredProjects.concat(projects.filter(project => !project.active));
    }
    return filteredProjects;
  }
}
