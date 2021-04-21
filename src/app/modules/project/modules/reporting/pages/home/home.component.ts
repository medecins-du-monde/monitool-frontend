import { Component, OnInit } from '@angular/core';
import InformationItem from 'src/app/models/interfaces/information-item';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  informations = [
    {
      res1: 'InformationPanel.General_reporting_home',
      res2: ''
    } as InformationItem
  ];

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.projectService.updateInformationPanel(this.informations);
  }

}
