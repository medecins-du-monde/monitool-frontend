import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgSelectOption } from '@angular/forms';
import { Project } from 'src/app/models/project';
import { projectsList } from 'src/app/constants/projects';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  // btn1Clicked = true;
  // btn2Clicked = false;
  // btn3Clicked = false;
  // countries: { option: string, value: string }[] = [
  //   {
  //     option: 'Tous les pays',
  //     value: 'tous'
  //   }
  // ];
  countries = ['Country 1', 'Country 2', 'Country3 '];
  themes = ['Theme 1', 'Theme 2'];
  filtersForm: FormGroup;
  // selectedCountry: string;
  // projects: Project[];
  // currentProjectList: Project[];
  // search = '';
  // searchedProjects: Project[];
  // filteredCountryProjects: Project[];

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.filtersForm = this.fb.group({
      countries: [[], Validators.required],
      themes: [[], Validators.required]
    });
    // this.selectedCountry = this.countries[0].value;
    // this.projects = projectsList.filter(project => project.active === true && new Date(Date.now()) < project.end);
    // this.currentProjectList = this.projects;
    // this.searchedProjects = this.projects;
    // this.initiateSelectMenu();
  }

  // onBtnClick(id) {
  //   if (id === 'btn-1') {
  //     this.btn1Clicked ? this.currentProjectList = this.currentProjectList.filter(p => p.active === false || new Date(Date.now()) > p.end)
  //       : this.currentProjectList.push(...projectsList.filter(project => project.active === true && new Date(Date.now()) < project.end));
  //     this.btn1Clicked = !this.btn1Clicked;
  //   }
  //   else if (id === 'btn-2') {
  //     this.btn2Clicked ? this.currentProjectList = this.currentProjectList.filter(p => p.active === false || new Date(Date.now()) < p.end)
  //       : this.currentProjectList.push(...projectsList.filter(project => project.active === true && new Date(Date.now()) > project.end));
  //     this.btn2Clicked = !this.btn2Clicked;
  //   }
  //   else if (id === 'btn-3') {
  //     this.btn3Clicked ? this.currentProjectList = this.currentProjectList.filter(p => p.active === true)
  //       : this.currentProjectList.push(...projectsList.filter(project => project.active === false));
  //     this.btn3Clicked = !this.btn3Clicked;
  //   }
  //   this.projects = this.currentProjectList;
  //   this.onSelectMenuChanged();
  //   if (this.search !== '') {
  //     this.onSearchbarChanged();
  //   }
  // }

  // onSearchbarChanged() {
  //   this.projects = this.currentProjectList.filter(project => project.name.startsWith(this.search));
  //   this.searchedProjects = this.projects;
  //   if (this.selectedCountry !== 'tous') {
  //     this.projects = this.filteredCountryProjects.filter(project => project.name.startsWith(this.search));
  //   }
  // }

  // onSelectMenuChanged() {
  //   if (this.selectedCountry !== 'tous') {
  //     this.projects = this.currentProjectList.filter(project => project.country === this.selectedCountry);
  //     this.filteredCountryProjects = this.projects;
  //   }
  //   else {
  //     this.projects = this.currentProjectList;
  //   }
  //   if (this.search !== '') {
  //     if (this.selectedCountry !== 'tous') {
  //       this.projects = this.searchedProjects.filter(project => project.country === this.selectedCountry);
  //     }
  //     else {
  //       this.projects = this.searchedProjects;
  //     }
  //   }
  // }

  // initiateSelectMenu() {
  //   projectsList.forEach(project => {
  //     if (this.countries.findIndex(x => x.option === project.country) === -1) {
  //       this.countries.push({ option: project.country, value: project.country });
  //     }
  //   });
  //   this.countries[0].option += ' (' + (this.countries.length - 1) + ')';
  // }
}
