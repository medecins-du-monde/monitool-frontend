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
  search: string;
  selectedButton = 'btn-1';

  constructor(private fb: FormBuilder) {
    this.countryForm = this.fb.group({
      countries: [null, Validators.required]
    });
    this.selectedCountry = this.countries[0].value;
    this.projects = projectsList.filter(project => project.state === 'En cours');
    this.currentProjectList = this.projects;
    this.initiateSelectMenu();
  }

  ngOnInit(): void {
  }

  onBtnClick(id) {
    if (id === 'btn-1') {
      this.btn1Clicked ? this.projects = this.projects.filter(p => p.state !== 'En cours')
        : this.projects.push(...projectsList.filter(project => project.state === 'En cours'));
      this.btn1Clicked = !this.btn1Clicked;
      this.currentProjectList = this.projects;
      this.initiateSelectMenu();
    }
    else if (id === 'btn-2') {
      this.btn2Clicked ? this.projects = this.projects.filter(p => p.state !== 'Terminé')
        : this.projects.push(...projectsList.filter(project => project.state === 'Terminé'));
      this.btn2Clicked = !this.btn2Clicked;
      this.currentProjectList = this.projects;
      this.initiateSelectMenu();
    }
    else if (id === 'btn-3') {
      this.btn3Clicked ? this.projects = this.projects.filter(p => p.state !== 'Supprimé')
        : this.projects.push(...projectsList.filter(project => project.state === 'Supprimé'));
      this.btn3Clicked = !this.btn3Clicked;
      this.currentProjectList = this.projects;
      this.initiateSelectMenu();
    }
    this.selectedButton = id;
  }

  onSearchbarChanged() {
    this.projects = this.currentProjectList.filter(project => project.projectName.startsWith(this.search));
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
