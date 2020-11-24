import { Project } from './../../../../../../models/project.model';
import { Form } from './../../../../../../models/form.model';
import { IndicatorModalComponent } from './../logical-frames/components/indicator-modal/indicator-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ProjectIndicator } from 'src/app/models/project-indicator.model';
import { ProjectService } from 'src/app/services/project.service';
import FormGroupBuilder from 'src/app/utils/form-group-builder';
@Component({
  selector: 'app-extra-indicators',
  templateUrl: './extra-indicators.component.html',
  styleUrls: ['./extra-indicators.component.scss']
})
export class ExtraIndicatorsComponent implements OnInit {

  extraIndicators: ProjectIndicator[] = [];
  Project: Project;
  indicatorsForm: FormGroup;
 
  constructor(private projectService: ProjectService, private fb: FormBuilder,public dialog:MatDialog) { }

  ngOnInit(): void {
    this.projectService.openedProject.subscribe((project: Project) => {
      this.extraIndicators = project.extraIndicators;
      this.Project = project;
    });
    this.setForm();
  }
  get indicators(): FormArray {

    return this.indicatorsForm.controls.indicators as FormArray;
  }

  private setForm() {
    this.indicatorsForm = this.fb.group({
      indicators: this.fb.array(this.extraIndicators.map(x => FormGroupBuilder.newIndicator(x)))
      });
  }
  onAddNewIndicator(): void {
    this.openDialog(FormGroupBuilder.newIndicator(), true);
  }
  onEditIndicator(indicator: FormGroup, index?: number) {
    this.openDialog(FormGroupBuilder.newIndicator(indicator.value), false, index);
  }

  onDeleteIndicator(i: number) {
    this.indicators.removeAt(i);
  }

  openDialog(indicator: FormGroup, add?: boolean, index?: number) {
    const dialogRef = this.dialog.open(IndicatorModalComponent, { data: { indicator, forms: this.indicatorsForm } });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        if (add) {
          this.indicators.push(res.indicator);
        }
        else if (index !== null) {
          this.indicators.setControl(index, res.indicator);
        }
      }
    });
  }
}
