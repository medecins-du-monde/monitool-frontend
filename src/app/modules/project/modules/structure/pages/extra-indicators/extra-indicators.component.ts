import { Project } from '../../../../../../models/classes/project.model';
import { IndicatorModalComponent } from './../logical-frames/components/indicator-modal/indicator-modal.component';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormArray, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { ProjectIndicator } from 'src/app/models/classes/project-indicator.model';
import { ProjectService } from 'src/app/services/project.service';
import FormGroupBuilder from 'src/app/utils/form-group-builder';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import InformationItem from 'src/app/models/interfaces/information-item';
import BreadcrumbItem from 'src/app/models/interfaces/breadcrumb-item.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-extra-indicators',
  templateUrl: './extra-indicators.component.html',
  styleUrls: ['./extra-indicators.component.scss']
})
export class ExtraIndicatorsComponent implements OnInit, OnDestroy {

  informations = [
    {
      res1: 'InformationPanel.Extra_indicators',
      res2: 'InformationPanel.Extra_indicators_description'
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
    } as InformationItem
  ];


  extraIndicatorsForm: UntypedFormGroup;

  extraIndicators: ProjectIndicator[] = [];
  project: Project;

  private subscription: Subscription = new Subscription();

  constructor(private projectService: ProjectService,
              private fb: UntypedFormBuilder,
              public dialog: MatDialog,
              private changeDetector: ChangeDetectorRef) { }

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
            value: 'ExtraIndicators',
          } as BreadcrumbItem,
        ];
        if (savedProject.region) {
          breadCrumbs.splice(2, 0, 
            {
              value: savedProject.region,
            } as BreadcrumbItem,
          );
        }
        this.projectService.updateBreadCrumbs(breadCrumbs);
      })
    );
    this.subscription.add(
      this.projectService.openedProject.subscribe((project: Project) => {
        this.project = project;
        this.setForm();
        this.changeDetector.markForCheck();
      })
    );
    this.projectService.updateInformationPanel(this.informations);
  }

  get indicators(): UntypedFormArray {
    return this.extraIndicatorsForm.controls.indicators as UntypedFormArray;
  }

  private setForm() {
    this.extraIndicatorsForm = this.fb.group({
      indicators: this.fb.array(this.project.extraIndicators.map(x => FormGroupBuilder.newIndicator(x)))
      });
  }
  onAddNewIndicator(): void {
    this.openDialog(FormGroupBuilder.newIndicator(), true);
  }
  onEditIndicator(indicator: UntypedFormGroup, index?: number): void {
    this.openDialog(FormGroupBuilder.newIndicator(indicator.value), false, index);
  }

  onDeleteIndicator(i: number): void {
    this.indicators.removeAt(i);
    this.project.extraIndicators.splice(i, 1);
    this.projectService.valid = this.extraIndicatorsForm.valid;
    this.projectService.project.next(this.project);
  }

  openDialog(indicator: UntypedFormGroup, add?: boolean, index?: number): void {
    const dialogRef = this.dialog.open(IndicatorModalComponent, { data: { indicator, forms: this.project.forms } });

    const dialogSubscription = dialogRef.afterClosed().subscribe(res => {
      if (res) {
        if (add) {
          this.project.extraIndicators.push(new ProjectIndicator(res.indicator.value));
          this.indicators.push(res.indicator);
          this.projectService.valid = this.extraIndicatorsForm.valid;
          this.projectService.project.next(this.project);
        }
        else if (index !== null) {
          this.project.extraIndicators[index] = new ProjectIndicator(res.indicator.value);
          this.indicators.setControl(index, res.indicator);
          this.projectService.valid = this.extraIndicatorsForm.valid;
          this.projectService.project.next(this.project);
        }
        dialogSubscription.unsubscribe();
      }
    });
  }

  // drag and drop function on a form array that can span accross multiple rows
  drop(event: CdkDragDrop<any>): void {
    moveItemInArray(this.indicators.controls, event.previousContainer.data.index, event.container.data.index);
    moveItemInArray(this.indicators.value, event.previousContainer.data.index, event.container.data.index);
    this.project.extraIndicators = this.indicators.value.map(x => new ProjectIndicator(x));
    this.projectService.project.next(this.project);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
