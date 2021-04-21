import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { Indicator } from 'src/app/models/classes/indicator.model';
import { Project } from 'src/app/models/classes/project.model';
import { Theme } from 'src/app/models/classes/theme.model';
import { IndicatorService } from 'src/app/services/indicator.service';
import { ProjectService } from 'src/app/services/project.service';
import { IndicatorModalComponent } from '../../pages/logical-frames/components/indicator-modal/indicator-modal.component';
import FormGroupBuilder from 'src/app/utils/form-group-builder';
import { ProjectIndicator } from 'src/app/models/classes/project-indicator.model';
import InformationItem from 'src/app/models/interfaces/information-item';

@Component({
  selector: 'app-cross-cutting',
  templateUrl: './cross-cutting.component.html',
  styleUrls: ['./cross-cutting.component.scss']
})
export class CrossCuttingComponent implements OnInit {

  informations = [
    {
      res1: 'InformationPanel.Crosscutting_indicators_list',
      res2: ''
    } as InformationItem
  ];

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
      this.indicatorService
        .listForProject(Object.keys(project.themes)
        .map(x => project.themes[x].id))
        .then((indicators: Indicator[]) => {
        this.indicators = [];
        this.groups = [];
        this.multiThemesIndicators = [];
        // Adding the indicators not initialized yet
        indicators.map(indicator => {
          const indicatorFound  = listOldCrossCutting.find(x => x.id === indicator.id);
          if (indicatorFound) {
          // Filling all data coming from the indicator configuration
            indicatorFound.themes = indicator.themes;
            // TODO: Filling it with the name in the right language
            indicatorFound.display = indicator.name.en;
            indicatorFound.description = indicator.description;
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
    this.projectService.updateInformationPanel(this.informations);
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
        // Filling the formGroup
        if (!indexGroup) {
          const multiThemesArray = this.crossCuttingForm.controls.multiThemesArray as FormArray;
          multiThemesArray.setControl(indexIndicator, res.indicator);
        }
        else {
          const groupsArray = this.crossCuttingForm.controls.groupsArray as FormArray;
          const groupIndicators = groupsArray.at(indexGroup).get('indicators') as FormArray;
          groupIndicators.setControl(indexIndicator, res.indicator);
        }

        // Updating the openedProject
        const indexToEdit = this.project.crossCutting[res.indicator.value.id];
        if (indexToEdit !== -1) {
          this.project.crossCutting[res.indicator.value.id] = new ProjectIndicator(res.indicator.value);
        }
        else {
          this.project.crossCutting[res.indicator.value.id] = new ProjectIndicator(res.indicator.value);
        }
        // TODO: Add a control of validity here. Not really necessary for the moment because we will change the structure of this page soon.
        this.projectService.project.next(this.project);
        }
    });
  }

}
