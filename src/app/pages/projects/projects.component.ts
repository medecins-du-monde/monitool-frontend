import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Project } from 'src/app/models/project';
import { projectsList } from 'src/app/constants/projects';

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

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.filtersForm = this.fb.group({
      search: '',
      countries: [[]],
      themes: [[]],
      statuses: [['Ongoing']]
    });
    this.projects = this.filterByStatuses(projectsList);
    this.filtersForm.valueChanges.subscribe(() => {
      this.onFilterChange();
    });
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
      return projects;
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
