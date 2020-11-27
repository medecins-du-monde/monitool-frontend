import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as _ from 'lodash';
import { forEach } from 'lodash';
import { OutputElement } from 'src/app/models/output-element.model';
import { Purpose } from 'src/app/models/purpose.model';
import { Activity } from 'src/app/models/activity.model';
import { ProjectIndicator } from 'src/app/models/project-indicator.model';

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

  static newIndicator(indicatorToEdit = null): FormGroup {
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
    return new FormGroup({
      display: new FormControl(indicator.display, Validators.required),
      baseline: new FormControl(indicator.baseline, Validators.required),
      target: new FormControl(indicator.target, Validators.required),
      computation: new FormGroup({
        formula: new FormControl(indicator.computation ? indicator.computation.formula : null),
        parameters: indicator.computation ? _.cloneDeep(parametersFormGroup) as FormGroup : new FormGroup({}),
      }),
      type: new FormControl(indicator.type)
    });
  }
}

