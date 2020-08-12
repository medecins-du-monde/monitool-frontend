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

  constructor(private fb: FormBuilder) {
    this.countryForm = this.fb.group({
      countries: [null, Validators.required]
    });
    this.selectedCountry = this.countries[0].value;
    this.projects = projectsList.filter(project => project.state === 'En cours');


  }

  ngOnInit(): void {
  }

  onBtnClick(id) {
    if (id === 'btn-1') {
      if (!this.btn1Clicked) {
        this.btn1Clicked = true;
        this.btn2Clicked = false;
        this.btn3Clicked = false;
        this.projects = projectsList.filter(project => project.state === 'En cours');
      }
    }
    else if (id === 'btn-2') {
      if (!this.btn2Clicked) {
        this.btn2Clicked = true;
        this.btn1Clicked = false;
        this.btn3Clicked = false;
        this.projects = projectsList.filter(project => project.state === 'Terminé');
      }
    }
    else if (id === 'btn-3') {
      if (!this.btn3Clicked) {
        this.btn3Clicked = true;
        this.btn2Clicked = false;
        this.btn1Clicked = false;
        this.projects = projectsList.filter(project => project.state === 'Supprimé');
      }
    }
  }
}
