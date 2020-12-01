import { Component, OnInit } from '@angular/core';
import { Entity } from 'src/app/models/entity.model';
import { Form } from 'src/app/models/form.model';
import { Project } from 'src/app/models/project.model';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-data-sources',
  templateUrl: './data-sources.component.html',
  styleUrls: ['./data-sources.component.scss']
})
export class DataSourcesComponent implements OnInit {

  project: Project;
  forms: Form[] = [];
  currentForm: Form;
  entities: Entity[];
  edition = false;

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.projectService.openedProject.subscribe((project: Project) => {
      this.project = project;
      this.forms = project.forms;
      this.entities = project.entities;
      if ( this.currentForm ) {
        this.currentForm = this.forms.find(x => x.id === this.currentForm.id);
      }
    });
  }

  onCreate(): void {
    this.currentForm = new Form();
    this.currentForm.start = this.project.start;
    this.currentForm.end = this.project.end;
    this.project.forms.push(this.currentForm);
    this.projectService.project.next(this.project);
    this.edition = true;
  }

  onEdit(form: Form) {
    this.edition = true;
    this.currentForm = form;
    this.projectService.project.next(this.project);
  }

  onDelete(form: Form) {
    this.project.forms = this.project.forms.filter(x => x.id !== form.id);
    this.projectService.project.next(this.project);
  }

}
