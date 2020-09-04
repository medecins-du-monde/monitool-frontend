import { Component, OnInit, Input } from '@angular/core';
import { Project } from '../../models/project';
import { themes } from 'src/app/constants/themes';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  @Input() project: Project;
  status: string;
  themesNames: string[] = [];

  constructor() { }

  ngOnInit(): void {
    if (this.project.active === true) {
      if (new Date(Date.now()) < this.project.end) {
        this.status = 'Ongoing';
      }
      else {
        this.status = 'Finished';
      }
    }
    else {
      this.status = 'Deleted';
    }
    this.project.themes.forEach(theme => {
      this.themesNames.push(themes.find(t => t._id === theme).shortName.fr);
    });
  }
}
