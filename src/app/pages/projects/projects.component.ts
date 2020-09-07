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

  searchText: string;
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
      countries: [[]],
      themes: [[]],
      statuses: [['Ongoing']]
    });
    this.projects = projectsList.filter(project => project.active === true);
    this.filtersForm.controls.countries.valueChanges.subscribe(e => {
      this.onSelectCountries(e);
    });
    this.filtersForm.controls.statuses.valueChanges.subscribe(e => {
      this.onSelectStatuses(e);
    });
  }

  onSearch(e: any): void {
    this.searchText = e;
    this.projects = projectsList.filter(project => project.name.toLowerCase().includes(e.toLowerCase()));
  }

  private onSelectCountries(countries: string[]): void {
    if (countries.length > 0) {
      this.projects = projectsList.filter(project => countries.includes(project.country));
    } else {
      this.projects = projectsList;
    }
  }

  private onSelectStatuses(statuses: string[]): void {
    let filteredProjects = [];
    if (statuses.includes('Ongoing')) {
      filteredProjects = filteredProjects.concat(projectsList.filter(project => project.active));
    }
    if (statuses.includes('Finished')) {
      filteredProjects = filteredProjects.concat(projectsList.filter(project => !project.active && project.end < new Date()));
    }
    if (statuses.includes('Deleted')) {
      filteredProjects = filteredProjects.concat(projectsList.filter(project => !project.active && project.end > new Date()));
    }
    this.projects = filteredProjects;
  }
}
