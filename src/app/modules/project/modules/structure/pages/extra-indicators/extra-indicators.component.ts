import { Project } from '../../../../../../models/classes/project.model';
import { IndicatorModalComponent } from './../logical-frames/components/indicator-modal/indicator-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ProjectIndicator } from 'src/app/models/classes/project-indicator.model';
import { ProjectService } from 'src/app/services/project.service';
import FormGroupBuilder from 'src/app/utils/form-group-builder';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-extra-indicators',
  templateUrl: './extra-indicators.component.html',
  styleUrls: ['./extra-indicators.component.scss']
})
export class ExtraIndicatorsComponent implements OnInit {
  extraIndicatorsForm: FormGroup;

  extraIndicators: ProjectIndicator[] = [];
  project: Project;

  constructor(private projectService: ProjectService, private fb: FormBuilder, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.projectService.openedProject.subscribe((project: Project) => {
      this.project = project;
      this.setForm();
    });
  }

  get indicators(): FormArray {
    return this.extraIndicatorsForm.controls.indicators as FormArray;
  }

  private setForm() {
    this.extraIndicatorsForm = this.fb.group({
      indicators: this.fb.array(this.project.extraIndicators.map(x => FormGroupBuilder.newIndicator(x)))
      });
  }
  onAddNewIndicator(): void {
    this.openDialog(FormGroupBuilder.newIndicator(), true);
  }
  onEditIndicator(indicator: FormGroup, index?: number): void {
    this.openDialog(FormGroupBuilder.newIndicator(indicator.value), false, index);
  }

  onDeleteIndicator(i: number): void {
    this.indicators.removeAt(i);
    this.project.extraIndicators.splice(i, 1);
    this.projectService.valid = this.extraIndicatorsForm.valid;
    this.projectService.project.next(this.project);
  }

  openDialog(indicator: FormGroup, add?: boolean, index?: number): void {
    const dialogRef = this.dialog.open(IndicatorModalComponent, { data: { indicator, forms: this.project.forms } });

    dialogRef.afterClosed().subscribe(res => {
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
      }
    });
  }

  // drag and drop function on a form array that can span accross multiple rows
  drop(event: CdkDragDrop<any>): void {
    this.indicators.setControl(event.previousContainer.data.index, event.container.data.indicator);
    this.indicators.setControl(event.container.data.index, event.previousContainer.data.indicator);
    this.project.extraIndicators = this.indicators.value.map(x => new ProjectIndicator(x));
    this.projectService.project.next(this.project);
  }

}
