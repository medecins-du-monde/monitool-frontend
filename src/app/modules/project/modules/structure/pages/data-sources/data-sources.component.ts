import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Entity } from 'src/app/models/classes/entity.model';
import { Form } from 'src/app/models/classes/form.model';
import { Project } from 'src/app/models/classes/project.model';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-data-sources',
  templateUrl: './data-sources.component.html',
  styleUrls: ['./data-sources.component.scss']
})
export class DataSourcesComponent implements OnInit, OnDestroy{

  project: Project;
  forms: Form[] = [];
  currentForm: Form;
  entities: Entity[];
  edition = false;

  private subscription: Subscription = new Subscription();

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.subscription.add(
      this.projectService.openedProject.subscribe((project: Project) => {
        this.project = project;
        this.forms = project.forms;
        this.entities = project.entities;
        if ( this.currentForm ) {
          this.currentForm = this.forms.find(x => x.id === this.currentForm.id);
          if (this.currentForm === undefined){
            this.onCreate();
          }
        }
      })
    );
  }

  onCreate(): void {
    this.currentForm = new Form();
    this.project.forms.push(this.currentForm);
    this.projectService.project.next(this.project);
    this.projectService.valid = false;
    this.edition = true;
  }

  onEdit(form: Form): void {
    this.edition = true;
    this.currentForm = form;
    this.projectService.project.next(this.project);
  }

  onDelete(form: Form): void {
    this.project.forms = this.project.forms.filter(x => x.id !== form.id);
    this.projectService.project.next(this.project);
  }

  // drag and drop function on a list than can span accross multiple rows
  drop(event: CdkDragDrop<any>) {
    this.forms[event.previousContainer.data.index] = event.container.data.form;
    this.forms[event.container.data.index] = event.previousContainer.data.form;
    event.currentIndex = 0;
    this.projectService.project.next(this.project);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
