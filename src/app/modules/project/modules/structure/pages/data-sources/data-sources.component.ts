import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Entity } from 'src/app/models/classes/entity.model';
import { Form } from 'src/app/models/classes/form.model';
import { Project } from 'src/app/models/classes/project.model';
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
      if (this.currentForm) {
        this.currentForm = this.forms.find(x => x.id === this.currentForm.id);
      }
    });
  }

  onCreate(): void {
    this.currentForm = new Form();
    this.project.forms.push(this.currentForm);
    this.projectService.project.next(this.project);
    this.edition = true;
  }

  onEdit(form: Form) {
    this.edition = true;
    this.currentForm = form;
    this.projectService.project.next(this.project);
  }

  changeComputation(formVariables, obj: Object) {
    //See if any variable id from the deleted datasource match an ID in the computation parameters
    for (const val of Object.values(obj)) {
      const matchingId = formVariables.filter( formVariable => formVariable === val['elementId']);
      if (matchingId.length) {
        return true
      }
    }
  }

  onDelete(form: Form) {
    //Get all the variables id from the deleted datasource
    let formVariables = [];
    form.elements.forEach(el => {
      formVariables.push(el.id)
    });

    //Delete datasource from extra indicators computation
    this.project.extraIndicators.map(extraIndicator => {
      const params = extraIndicator.computation.parameters;
      //If the deleted ddatasource was used in the computation of this indicator, set computation to null
      if(this.changeComputation(formVariables, params)) {
        extraIndicator.computation = null;
      }
    });

    //Delete datasource from logical frames
    this.project.logicalFrames.map(logicalFrame => {
      console.log('logical frame', logicalFrame);

      //Delete from purpose indicators
      logicalFrame.purposes.forEach(purpose => {
        purpose.indicators.forEach(indicator => {
          const params = indicator.computation.parameters;
          if(this.changeComputation(formVariables, params)) {
            indicator.computation = null;
          }
        })
      })

      //Delete from indicators
      logicalFrame.indicators.forEach(indicator => {
        const params = indicator.computation.parameters;
        if(this.changeComputation(formVariables, params)) {
          indicator.computation = null;
        }
      })
    });

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

}
