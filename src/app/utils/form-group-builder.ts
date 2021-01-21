import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import * as _ from 'lodash';
import { forEach } from 'lodash';
import { OutputElement } from 'src/app/models/classes/output-element.model';
import { Purpose } from 'src/app/models/classes/purpose.model';
import { Activity } from 'src/app/models/classes/activity.model';
import { ProjectIndicator } from 'src/app/models/classes/project-indicator.model';
import { Theme } from 'src/app/models/classes/theme.model';

export default class FormGroupBuilder {

  static newPurpose(purpose?: Purpose): FormGroup {
    if (!purpose) {
      purpose = new Purpose();
    }
    return new FormGroup({
      assumptions: new FormControl(purpose.assumptions, Validators.required),
      description: new FormControl(purpose.description, Validators.required),
      outputs: new FormArray(purpose.outputs.map(x => this.newOutput(x))),
      indicators: new FormArray(purpose.indicators.map(x => this.newIndicator(x))),
    });
  }

  static newOutput(output?: OutputElement): FormGroup {
    if (!output) {
      output = new OutputElement();
    }
    return new FormGroup({
      assumptions: new FormControl(output.assumptions, Validators.required),
      description: new FormControl(output.description, Validators.required),
      activities: new FormArray(output.activities.map(x => this.newActivity(x))),
      indicators: new FormArray(output.indicators.map(x => this.newIndicator(x))),
    });
  }

  static newActivity(activity?: Activity) {
    if (!activity) {
      activity = new Activity();
    }
    return new FormGroup({
      description: new FormControl(activity.description, Validators.required),
      indicators: new FormArray(activity.indicators.map(x => this.newIndicator(x))),
    });
  }

  static newIndicator(indicatorToEdit = null, crossCutting = false): FormGroup {
    const indicator = new ProjectIndicator(indicatorToEdit);

    const parametersFormGroup = new FormGroup({});

    if (indicator.computation) {
      forEach(indicator.computation.parameters, (parameter, key) => {
        const filterGroup = new FormGroup({});

        // tslint:disable-next-line: no-string-literal
        forEach(parameter['filter'], (filterValue: string[], keyFilter: string) => {
        filterGroup.addControl(`${keyFilter}`, new FormControl(filterValue)); });
        parametersFormGroup.addControl(`${key}`, new FormGroup({
          // tslint:disable-next-line: no-string-literal
          elementId: new FormControl (parameter['elementId'], Validators.required),
          filter: filterGroup as FormGroup,
        }));
      });
    }
    // TODO: Review to have a way to do it cleaner
    if (crossCutting) {
      return new FormGroup({
        crossCutting: new FormControl(true, Validators.required),
        id: new FormControl(indicator.id, Validators.required),
        description: indicator.description ? new FormGroup({
          en: new FormControl(indicator.description.en),
          es: new FormControl(indicator.description.es),
          fr: new FormControl(indicator.description.fr),
        }) : new FormControl(null),
        display: new FormControl(indicator.display),
        baseline: new FormControl(indicator.baseline, Validators.required),
        target: new FormControl(indicator.target, Validators.required),
        colorize: new FormControl(indicator.colorize),
        computation: new FormGroup({
          formula: new FormControl(indicator.computation ? indicator.computation.formula : null),
          parameters: indicator.computation ? _.cloneDeep(parametersFormGroup) as FormGroup : new FormGroup({}),
        }),
        type: new FormControl(indicator.type)
      });
    }
    else {
      return new FormGroup({
        display: new FormControl(indicator.display, Validators.required),
        baseline: new FormControl(indicator.baseline),
        target: new FormControl(indicator.target),
        colorize: new FormControl(indicator.colorize),
        computation: new FormGroup({
          formula: new FormControl(indicator.computation ? indicator.computation.formula : null),
          parameters: indicator.computation ? _.cloneDeep(parametersFormGroup) as FormGroup : new FormGroup({}),
        }),
        type: new FormControl(indicator.type)
      });
    }
  }

  static newTheme(theme?: Theme): FormGroup {
    if (!theme) {
      theme = new Theme();
    }
    return new FormGroup({
      id: new FormControl(theme.id, Validators.required),
      type: new FormControl(theme.type, Validators.required),
      name: new FormControl(theme.name, Validators.required),
      shortName: new FormControl(theme.shortName, Validators.required),
      rev: new FormControl(theme.rev, Validators.required),
    });
  }

  static newIndicatorGroup(group?: {theme: Theme, indicators: ProjectIndicator[]}): FormGroup {
    if (!group) {
      const theme = new Theme();
      const indicators: ProjectIndicator[] = [];
      group = {theme, indicators};
    }
    return new FormGroup({
      theme: this.newTheme(group.theme),
      indicators: new FormArray(group.indicators.map(indicator => this.newIndicator(indicator, true))),
    });
  }

}

