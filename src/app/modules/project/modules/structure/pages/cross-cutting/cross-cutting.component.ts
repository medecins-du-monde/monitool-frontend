import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { Indicator } from 'src/app/models/indicator.model';
import { Project } from 'src/app/models/project.model';
import { Theme } from 'src/app/models/theme.model';
import { IndicatorService } from 'src/app/services/indicator.service';
import { ProjectService } from 'src/app/services/project.service';
import { IndicatorModalComponent } from '../../pages/logical-frames/components/indicator-modal/indicator-modal.component';
import FormGroupBuilder from 'src/app/utils/form-group-builder';
import { ProjectIndicator } from 'src/app/models/project-indicator.model';

@Component({
  selector: 'app-cross-cutting',
  templateUrl: './cross-cutting.component.html',
  styleUrls: ['./cross-cutting.component.scss']
})
export class CrossCuttingComponent implements OnInit {

  project: Project;
  indicators: ProjectIndicator[] = [];

  groups: { theme: Theme, indicators: ProjectIndicator[]}[] = [];

  multiThemesIndicators: ProjectIndicator[] = [];

  crossCuttingForm: FormGroup;

  get groupsArray(): FormArray {
    return this.crossCuttingForm.controls.groupsArray as FormArray;
  }

  get multiThemesArray(): FormArray {
    return this.crossCuttingForm.controls.multiThemesArray as FormArray;
  }

  getIndicators(groupNumber): FormArray {
    return this.crossCuttingForm.controls.groupsArray.get(`${groupNumber}`).get('indicators') as FormArray;
  }

  get currentLang() {
    return this.translateService.currentLang ? this.translateService.currentLang : this.translateService.defaultLang;
  }

  constructor(
    private translateService: TranslateService,
    private indicatorService: IndicatorService,
    private projectService: ProjectService,
    private dialog: MatDialog,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.setForm();

    this.projectService.openedProject.subscribe((project: Project) => {
      // CrossCutting already in the project
      this.project = project;

      // Initialization of indicatorlist with the one that we already have
      const listOldCrossCutting =  [];
      Object.keys(this.project.crossCutting).map(x => {
        const crossCutting = this.project.crossCutting[x];
        crossCutting.id = x;
        listOldCrossCutting.push(crossCutting);
      }
      );

      this.indicatorService.list().then((indicators: Indicator[]) => {
        this.indicators = [];
        this.groups = [];
        this.multiThemesIndicators = [];
        // Adding the indicators not initialized yet
        indicators.map(indicator => {
          const indicatorFound  = listOldCrossCutting.find(x => x.id === indicator.id);
          if (indicatorFound) {
          indicatorFound.themes = indicator.themes;
          this.indicators.push(new ProjectIndicator(indicatorFound));
          }
          else {
            this.indicators.push(new ProjectIndicator(indicator));
          }
        });
        this.indicators.forEach(x => {
          if (x.themes.length > 1) {
            this.multiThemesIndicators.push(x);
          } else if (x.themes.length > 0){
            const group = this.groups.find(g => g.theme.id === x.themes[0].id );
            if ( group ) {
              group.indicators.push(x);
            } else if (x.themes.length > 0){
              this.groups.push({ theme: x.themes[0], indicators: [x] });
            }
          }
        });
        this.setForm();
      });

    });
  }

  private setForm(): void {
    this.crossCuttingForm = this.fb.group({
      groupsArray: this.fb.array(this.groups.map(indicatorGroup => FormGroupBuilder.newIndicatorGroup(indicatorGroup))),
      multiThemesArray: this.fb.array(this.multiThemesIndicators.map(indicator => FormGroupBuilder.newIndicator(indicator, true))),
    });
  }

  onEditIndicator(indicator: FormGroup, index?: number, indexGroup?: number) {
    this.openDialog(FormGroupBuilder.newIndicator(indicator.value, true), index, indexGroup);
  }

  openDialog(indicator: FormGroup, indexIndicator?: number, indexGroup?: number) {
    const dialogRef = this.dialog.open(IndicatorModalComponent, { data: { indicator, forms: this.project.forms } });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        if (!indexGroup) {
          const multiThemesArray = this.crossCuttingForm.controls.multiThemesArray as FormArray;
          multiThemesArray.setControl(indexIndicator, res.indicator);
        }
        const groupsArray = this.crossCuttingForm.controls.groupsArray as FormArray;
        const groupIndicators = groupsArray.at(indexGroup).get('indicators') as FormArray;
        const indexToEdit = this.project.crossCutting[res.indicator.value.id];
        if (indexToEdit !== -1) {
          this.project.crossCutting[res.indicator.value.id] = new ProjectIndicator(res.indicator.value);
        }
        else {
          this.project.crossCutting[res.indicator.value.id] = new ProjectIndicator(res.indicator.value);
        }
        this.projectService.project.next(this.project);
        groupIndicators.setControl(indexIndicator, res.indicator);
      }
    });
  }

}
