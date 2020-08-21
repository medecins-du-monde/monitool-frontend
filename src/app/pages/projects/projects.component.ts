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
  btn1Clicked = true;
  btn2Clicked = false;
  btn3Clicked = false;
  countries: { option: string, value: string }[] = [
    {
      option: 'Tous les pays',
      value: 'tous'
    }
  ];
  countryForm: FormGroup;
  selectedCountry: string;
  projects: Project[];
  currentProjectList: Project[];
  search = '';
  selectedButton = 'btn-1';

  constructor(private fb: FormBuilder) {
    this.countryForm = this.fb.group({
      countries: [null, Validators.required]
    });
    this.selectedCountry = this.countries[0].value;
    this.projects = projectsList.filter(project => project.active === true && new Date(Date.now()) < project.end);
    this.currentProjectList = this.projects;
    this.initiateSelectMenu();
  }

  ngOnInit(): void {
  }

  onBtnClick(id) {
    if (id === 'btn-1') {
      this.btn1Clicked ? this.projects = this.projects.filter(p => p.active === false || new Date(Date.now()) > p.end)
        : this.projects.push(...projectsList.filter(project => project.active === true && new Date(Date.now()) < project.end));
      this.btn1Clicked = !this.btn1Clicked;
      this.currentProjectList = this.projects;
      this.initiateSelectMenu();
    }
    else if (id === 'btn-2') {
      this.btn2Clicked ? this.projects = this.projects.filter(p => p.active === false || new Date(Date.now()) < p.end)
        : this.projects.push(...projectsList.filter(project => project.active === true && new Date(Date.now()) > project.end));
      this.btn2Clicked = !this.btn2Clicked;
      this.currentProjectList = this.projects;
      this.initiateSelectMenu();
    }
    else if (id === 'btn-3') {
      this.btn3Clicked ? this.projects = this.projects.filter(p => p.active === true)
        : this.projects.push(...projectsList.filter(project => project.active === false));
      this.btn3Clicked = !this.btn3Clicked;
      this.currentProjectList = this.projects;
      this.initiateSelectMenu();
    }
    if (this.search !== '') {
      this.onSearchbarChanged();
    }
    this.selectedButton = id;
  }

  onSearchbarChanged() {
    this.projects = this.currentProjectList.filter(project => project.name.startsWith(this.search));
  }
  onSelectMenuChanged(e) {
    this.onBtnClick(this.selectedButton);
    if (this.selectedCountry !== 'tous') {
      this.projects = this.projects.filter(project => project.country === this.selectedCountry);
      this.currentProjectList = this.projects;
    }
  }
  initiateSelectMenu() {
    this.countries = [
      {
        option: 'Tous les pays',
        value: 'tous'
      }
    ];
    this.projects.forEach(project => {
      if (this.countries.findIndex(x => x.option === project.country) === -1) {
        this.countries.push({ option: project.country, value: project.country });
      }
    });
    this.countries[0].option += ' (' + (this.countries.length - 1) + ')';
  }
}
