// tslint:disable: no-string-literal
// tslint:disable: ban-types
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Form } from 'src/app/models/classes/form.model';
import { Project } from 'src/app/models/classes/project.model';
import InformationItem from 'src/app/models/interfaces/information-item';
import BreadcrumbItem from 'src/app/models/interfaces/breadcrumb-item.model';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-data-sources-list',
  templateUrl: './data-sources-list.component.html',
  styleUrls: ['./data-sources-list.component.scss']
})
export class DataSourcesListComponent implements OnInit {

  informations = [
    {
      res1: 'InformationPanel.Datasources_list',
      res2: 'InformationPanel.Datasources_description'
    } as InformationItem,
    {
      res1: 'InformationPanel.General_Naming_convention_question',
      res2: 'InformationPanel.General_Naming_convention_response'
    } as InformationItem,
    {
      res1: 'InformationPanel.General_accidental_delete_question',
      res2: 'InformationPanel.General_accidental_delete_response'
    } as InformationItem,
    {
      res1: 'InformationPanel.General_delete_saved_question',
      res2: 'InformationPanel.General_delete_saved_response'
    } as InformationItem,
    {
      res1: 'InformationPanel.Datasources_question1',
      res2: 'InformationPanel.Datasources_response1'
    } as InformationItem,
    {
      res1: 'InformationPanel.Datasources_question2',
      res2: 'InformationPanel.Datasources_response2'
    } as InformationItem
  ];

  project: Project;
  forms: Form[] = [];
  deletedFormVariables = [];

  constructor(
    private projectService: ProjectService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.projectService.openedProject.subscribe((project: Project) => {
      this.project = project;
      this.forms = project.forms;

      const breadCrumbs = [
        {
          value: 'Projects',
          link: './../../projects'
        } as BreadcrumbItem,
        {
          value: project.country,
        } as BreadcrumbItem,
        {
          value: project.name,
        } as BreadcrumbItem,
        {
          value: 'Structure',
        } as BreadcrumbItem,
        {
          value: 'DataSources',
        } as BreadcrumbItem,
      ];
      this.projectService.updateBreadCrumbs(breadCrumbs);
    });
    this.projectService.updateInformationPanel(this.informations);
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
    // Get all the variables id from the deleted datasource
    form.elements.forEach(el => {
      this.deletedFormVariables.push(el.id);
    });

    // Delete datasource from extra indicators computation
    this.project.extraIndicators.map(extraIndicator => {
      if (extraIndicator.computation) {
        const params = extraIndicator.computation.parameters;
        // If the deleted datasource was used in the computation of this indicator, set computation to null
        if (this.computationBroken(params)) {
          extraIndicator.computation = null;
        }
      }
    });

    // Delete datasource from cross-cutting indicators
    for (const val of Object.values(this.project.crossCutting)) {
      // Check for computation
      if (val['computation']) {
        const params = val['computation']['parameters'];
        if (this.computationBroken(params)) {
          val['computation'] = null;
        }
      }
    }

    // Delete the datasource from logicalFrames
    this.deleteDatasource(this.project.logicalFrames);

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

  // This method check if deleting a datasource has broken a computation
  computationBroken(obj: Object) {
    // Check if any variable id from the deleted datasource match an ID in the computation parameters
    for (const val of Object.values(obj)) {
      const matchingId = this.deletedFormVariables.filter( formVariable => formVariable === val.elementId);
      if (matchingId.length) {
        return true;
      }
    }
  }

  deleteDatasource(logicalFramesArr): void {
    // Iterate through all the logical frames
    logicalFramesArr.map(data => {
      // Iterate through one logicalFrame object
      for (const key in data) {
        // If there is an indicator key
        if (key === 'indicators') {
          if (data.indicators.length) {
            // Iterate through all the indicators
            data.indicators.forEach(indicator => {
              // Check for computation
              if (indicator.computation) {
                const params = indicator.computation.parameters;
                // If one of the paramaters uses the deleted datasource, set computation to null
                if (this.computationBroken(params)) {
                  indicator.computation = null;
                }
              }
            });
          }
        } else {
          // If there is another array in the logicalFrames object, it might contain indicators
          // hence the recursion
          if (data[key] instanceof Array) {
            this.deleteDatasource(data[key]);
          }
        }
      }
    });
  }
}
