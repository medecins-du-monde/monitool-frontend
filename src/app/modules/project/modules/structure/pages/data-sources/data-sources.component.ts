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
  deletedFormVaraibles = [];

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

  changeComputation(obj: Object) {
    //Check if any variable id from the deleted datasource match an ID in the computation parameters
    for (const val of Object.values(obj)) {
      const matchingId = this.deletedFormVaraibles.filter( formVariable => formVariable === val['elementId']);
      if (matchingId.length) {
        return true;
      }
    }
  }

  deleteDatasource(logicalFramesArr) {
    //Iterate through all the logical frames
    logicalFramesArr.map(data => {
      //Iterate through one logicalFrame object
      for (const key in data) {
        //If there is an indicator key
        if (key === 'indicators') {
          if (data['indicators'].length) {
            //Iterate through all the indicators
            data['indicators'].forEach(indicator => {
              //Check for computation
              if (indicator.computation) {
                const params = indicator.computation.parameters;
                // If one of the paramaters uses the deleted datasource, set computation to null
                if(this.changeComputation(params)) {
                  indicator.computation = null;
                }
              }
            })
          }
        } else {
          // If there is another array in the logicalFrames object, it might contain indicators 
          // hence the recursion
          if (data[key] instanceof Array) {
            this.deleteDatasource(data[key]);
          }
        }
      }
    })
  }

  onDelete(form: Form) {
    //Get all the variables id from the deleted datasource
    form.elements.forEach(el => {
      this.deletedFormVaraibles.push(el.id)
    });

    //Delete datasource from extra indicators computation
    this.project.extraIndicators.map(extraIndicator => {
      if (extraIndicator.computation) {
        const params = extraIndicator.computation.parameters;
        //If the deleted datasource was used in the computation of this indicator, set computation to null
        if(this.changeComputation(params)) {
          extraIndicator.computation = null;
        }
      }
    });

    //Delete the datasource from logicalFrames
    this.deleteDatasource(this.project.logicalFrames);

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
