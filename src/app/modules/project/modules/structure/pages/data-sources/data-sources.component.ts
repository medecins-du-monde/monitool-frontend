import { Component, OnInit } from '@angular/core';
import { Form } from 'src/app/models/form.model';
import { Project } from 'src/app/models/project.model';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-data-sources',
  templateUrl: './data-sources.component.html',
  styleUrls: ['./data-sources.component.scss']
})
export class DataSourcesComponent implements OnInit {

  forms: Form[] = [];

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.projectService.openedProject.subscribe((project: Project) => {
      this.forms = project.forms;
    });
  }

}
