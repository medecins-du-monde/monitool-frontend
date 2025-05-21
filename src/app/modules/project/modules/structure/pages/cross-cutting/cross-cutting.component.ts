import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormArray, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
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
import BreadcrumbItem from 'src/app/models/interfaces/breadcrumb-item.model';
import { Subscription } from 'rxjs';

class CCProjectIndicator extends ProjectIndicator {
  configured = false;

  constructor(input?: any) {
    super(input);
    this.configured = input.configured ? true : false;
  }
}

@Component({
  selector: 'app-cross-cutting',
  templateUrl: './cross-cutting.component.html',
  styleUrls: ['./cross-cutting.component.scss']
})
export class CrossCuttingComponent implements OnInit, OnDestroy {

  informations = [
    {
      res1: 'InformationPanel.Crosscutting_indicators_list',
      res2: ''
    } as InformationItem
  ];

  project: Project;
  indicators: CCProjectIndicator[] = [];

  groups: { theme: Theme, indicators: CCProjectIndicator[]}[] = [];

  multiThemesIndicators: CCProjectIndicator[] = [];

  crossCuttingForm: UntypedFormGroup;

  private subscription: Subscription = new Subscription();

  get groupsArray(): UntypedFormArray {
    return this.crossCuttingForm.controls.groupsArray as UntypedFormArray;
  }

  get multiThemesArray(): UntypedFormArray {
    return this.crossCuttingForm.controls.multiThemesArray as UntypedFormArray;
  }

  getIndicators(groupNumber: string): UntypedFormArray {
    return this.crossCuttingForm.controls.groupsArray.get(`${groupNumber}`).get('indicators') as UntypedFormArray;
  }

  // TODO: Remove this method if not used
  get currentLang(): string {
    return this.translateService.currentLang ? this.translateService.currentLang : this.translateService.defaultLang;
  }

  constructor(
    private translateService: TranslateService,
    private indicatorService: IndicatorService,
    private projectService: ProjectService,
    private dialog: MatDialog,
    private fb: UntypedFormBuilder,
    private changeDetector: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.setForm();

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
            value: 'CrossCuttingIndicators',
          } as BreadcrumbItem
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
            const indicatorFound = listOldCrossCutting.find(x => x.id === indicator.id);
            if (indicatorFound) {
            // Filling all data coming from the indicator configuration
              indicatorFound.themes = indicator.themes;
              // TODO: Filling it with the name in the right language
              indicatorFound.display = indicator.name;
              indicatorFound.description = indicator.description;
              indicatorFound.configured = true;
              this.indicators.push(new CCProjectIndicator(indicatorFound));
            }
            else {
              this.indicators.push(new CCProjectIndicator(indicator));
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
          this.changeDetector.markForCheck();
        });
      })
    );
    this.projectService.updateInformationPanel(this.informations);
  }

  private setForm(): void {
    this.crossCuttingForm = this.fb.group({
      groupsArray: this.fb.array(this.groups.map(indicatorGroup => FormGroupBuilder.newIndicatorGroup(indicatorGroup))),
      multiThemesArray: this.fb.array(this.multiThemesIndicators.map(indicator => FormGroupBuilder.newIndicator(indicator, true))),
    });
  }

  onEditIndicator(indicator: UntypedFormGroup, index?: number, indexGroup?: number): void {
    this.openDialog(FormGroupBuilder.newIndicator(indicator.value, true), index, indexGroup);
  }

  onDelete(indicator: UntypedFormGroup, index?: number, indexGroup?: number): void {
    delete this.project.crossCutting[indicator.value.id];
    this.projectService.project.next(this.project);
  }

  openDialog(indicator: UntypedFormGroup, indexIndicator?: number, indexGroup?: number): void {
    const dialogRef = this.dialog.open(IndicatorModalComponent, { data: { indicator, forms: this.project.forms, isCC: true } });
    const dialogSubscription = dialogRef.afterClosed().subscribe(res => {
      if (res) {
        // Filling the formGroup
        if (!indexGroup) {
          const multiThemesArray = this.crossCuttingForm.controls.multiThemesArray as UntypedFormArray;
          multiThemesArray.setControl(indexIndicator, res.indicator);
        }
        else {
          const groupsArray = this.crossCuttingForm.controls.groupsArray as UntypedFormArray;
          const groupIndicators = groupsArray.at(indexGroup).get('indicators') as UntypedFormArray;
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
        dialogSubscription.unsubscribe();
      }
    });
  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }

}
