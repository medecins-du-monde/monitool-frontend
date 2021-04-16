import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Form } from 'src/app/models/classes/form.model';
import { Project } from 'src/app/models/classes/project.model';
import InformationIntro from 'src/app/models/interfaces/information-intro';
import InformationItem from 'src/app/models/interfaces/information-item';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-data-sources-list',
  templateUrl: './data-sources-list.component.html',
  styleUrls: ['./data-sources-list.component.scss']
})
export class DataSourcesListComponent implements OnInit {

  informationIntro = {
    title: 'InformationPanel.Datasources_list',
    description: 'InformationPanel.Datasources_description'
  } as InformationIntro;

  informations = [
    {
      question: 'InformationPanel.General_Naming_convention_question',
      response: 'InformationPanel.General_Naming_convention_response'
    } as InformationItem,
    {
      question: 'InformationPanel.General_accidental_delete_question',
      response: 'InformationPanel.General_accidental_delete_response'
    } as InformationItem,
    {
      question: 'InformationPanel.General_delete_saved_question',
      response: 'InformationPanel.General_delete_saved_response'
    } as InformationItem,
    {
      question: 'InformationPanel.Datasources_question1',
      response: 'InformationPanel.Datasources_response1'
    } as InformationItem,
    {
      question: 'InformationPanel.Datasources_question2',
      response: 'InformationPanel.Datasources_response2'
    } as InformationItem
  ]

  project: Project;
  forms: Form[] = [];

  constructor(
    private projectService: ProjectService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.projectService.openedProject.subscribe((project: Project) => {
      this.project = project;
      this.forms = project.forms;
    });
    this.projectService.updateInformationPanel(this.informations);
    this.projectService.updateInformationIntro(this.informationIntro);
  }

  onCreate(): void {
    const newForm = new Form();
    this.project.forms.push(newForm);
    this.projectService.project.next(this.project);
    this.router.navigate([`${this.router.url}/${newForm.id}`]);
  }

  onEdit(form: Form): void {
    this.projectService.project.next(this.project);
    this.router.navigate([`${this.router.url}/${form.id}`]);
  }

  onDelete(form: Form): void {
    this.project.forms = this.project.forms.filter(x => x.id !== form.id);
    this.projectService.project.next(this.project);
  }

  // drag and drop function on a list than can span accross multiple rows
  drop(event: CdkDragDrop<any>): void {
    this.forms[event.previousContainer.data.index] = event.container.data.form;
    this.forms[event.container.data.index] = event.previousContainer.data.form;
    event.currentIndex = 0;
    this.projectService.project.next(this.project);
  }

}
