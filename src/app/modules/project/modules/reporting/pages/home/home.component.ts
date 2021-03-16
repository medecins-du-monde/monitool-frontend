import { Component, OnInit } from '@angular/core';
import InformationIntro from 'src/app/models/interfaces/information-intro';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  informationIntro = {
    title: 'Accueil rapport',
    description: ''
  } as InformationIntro;

  informations = [];

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.projectService.updateInformationPanel(this.informations);
    this.projectService.updateInformationIntro(this.informationIntro);
  }

}
