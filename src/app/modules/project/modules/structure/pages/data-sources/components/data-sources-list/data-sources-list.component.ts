// tslint:disable: no-string-literal
// tslint:disable: ban-types
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Form } from 'src/app/models/classes/form.model';
import { Project } from 'src/app/models/classes/project.model';
import InformationItem from 'src/app/models/interfaces/information-item';
import BreadcrumbItem from 'src/app/models/interfaces/breadcrumb-item.model';
import { ProjectService } from 'src/app/services/project.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteModalComponent } from '../../../../components/delete-modal/delete-modal.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-data-sources-list',
  templateUrl: './data-sources-list.component.html',
  styleUrls: ['./data-sources-list.component.scss']
})
export class DataSourcesListComponent implements OnInit, OnDestroy {

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

  private subscription: Subscription = new Subscription();

  constructor(
    private projectService: ProjectService,
    private router: Router,
    private changeDetector: ChangeDetectorRef,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.subscription.add(
      this.projectService.lastSavedVersion.subscribe((savedProject: Project) => {
        const breadCrumbs = [
          {
            value: 'Projects',
            link: './../../projects'
          } as BreadcrumbItem,
          {
            value: savedProject.country,
          } as BreadcrumbItem,
          {
            value: savedProject.name,
          } as BreadcrumbItem,
          {
            value: 'Structure',
          } as BreadcrumbItem,
          {
            value: 'DataSources',
          } as BreadcrumbItem,
        ];
        this.projectService.updateBreadCrumbs(breadCrumbs);
      })
    );

    this.subscription.add(
      this.projectService.openedProject.subscribe((project: Project) => {
        this.project = project;
        this.forms = project.forms;
        this.changeDetector.markForCheck();
      })
    );
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
    const dialogRef = this.dialog.open(DeleteModalComponent, { data: { type: 'datasource', item: form.name } });

    const dialogSubscription = dialogRef.afterClosed().subscribe(res => {
      if (res && res.delete){

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

        // Delete the datasource from users
        this.project.users.map(user => {
            if (user.dataSources) {
              const dataSourcePosition = user.dataSources.findIndex(el => el.id === form.id)
              if (dataSourcePosition > -1) {
                user.dataSources.splice(dataSourcePosition, 1);
              }
            }
        });

        this.project.forms = this.project.forms.filter(x => x.id !== form.id);
        this.projectService.project.next(this.project);
        dialogSubscription.unsubscribe();
      }
    });
  }

  // drag and drop function on a list than can span accross multiple rows
  drop(event: CdkDragDrop<any>): void {
    moveItemInArray(this.forms, event.previousContainer.data.index, event.container.data.index);
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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
