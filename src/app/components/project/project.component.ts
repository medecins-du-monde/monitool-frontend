import { Component, OnInit, Input } from '@angular/core';
import { Project } from '../../models/project';
import { themes } from 'src/app/constants/themes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  @Input() project: Project;
  status: string;
  themesNames: string[] = [];

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.project.active === true) {
      if (new Date(Date.now()) < this.project.end) {
        this.status = 'En cours';
      }
      else {
        this.status = 'Terminé';
      }
    }
    else {
      this.status = 'Supprimé';
    }
    this.project.themes.forEach(theme => {
      this.themesNames.push(themes.find(t => t._id === theme).shortName.fr);
    });
  }
}
