import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import * as _ from 'lodash';
import { forEach } from 'lodash';
import { OutputElement } from 'src/app/models/classes/output-element.model';
import { Purpose } from 'src/app/models/classes/purpose.model';
import { Activity } from 'src/app/models/classes/activity.model';
import { ProjectIndicator } from 'src/app/models/classes/project-indicator.model';
import { Theme } from 'src/app/models/classes/theme.model';
import { Project } from 'src/app/models/classes/project.model';
import { Entity } from 'src/app/models/classes/entity.model';
import { Group } from 'src/app/models/classes/group.model';
import DatesHelper from './dates-helper';


export default class FormGroupBuilder {

  // Please, add your new form group here


/* ---------- Here are all the form groups needed for the logical frame part --------- */

  static newPurpose(purpose?: Purpose): FormGroup {
    if (!purpose) {
      purpose = new Purpose();
    }
    return new FormGroup({
      id: new FormControl(purpose.id),
      assumptions: new FormControl(purpose.assumptions),
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
      id: new FormControl(output.id),
      assumptions: new FormControl(output.assumptions),
      description: new FormControl(output.description, Validators.required),
      activities: new FormArray(output.activities.map(x => this.newActivity(x))),
      indicators: new FormArray(output.indicators.map(x => this.newIndicator(x))),
    });
  }

  static newActivity(activity?: Activity): FormGroup {
    if (!activity) {
      activity = new Activity();
    }
    return new FormGroup({
      id: new FormControl(activity.id),
      description: new FormControl(activity.description),
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

    let resultFormGroup;
    if (crossCutting) {
      resultFormGroup = new FormGroup({
        crossCutting: new FormControl(true, Validators.required),
        id: new FormControl(indicator.id, Validators.required),
        description: indicator.description ? new FormGroup({
          en: new FormControl(indicator.description.en),
          es: new FormControl(indicator.description.es),
          fr: new FormControl(indicator.description.fr),
        }) : new FormControl(null),
        display: new FormControl(indicator.display),
        baseline: new FormControl(indicator.baseline),
        target: new FormControl(indicator.target),
        unit: new FormControl(indicator.unit),
        colorize: new FormControl(indicator.colorize),
        computation: new FormGroup({
          formula: new FormControl(indicator.computation ? indicator.computation.formula : null),
          parameters: indicator.computation ? _.cloneDeep(parametersFormGroup) as FormGroup : new FormGroup({}),
        }),
        type: new FormControl(indicator.type)
      });
    }
    else {
      resultFormGroup = new FormGroup({
        id: new FormControl(indicator.id, Validators.required),
        display: new FormControl(indicator.display, Validators.required),
        baseline: new FormControl(indicator.baseline),
        target: new FormControl(indicator.target),
        unit: new FormControl(indicator.unit),
        colorize: new FormControl(indicator.colorize),
        computation: new FormGroup({
          formula: new FormControl(indicator.computation ? indicator.computation.formula : null),
          parameters: indicator.computation ? _.cloneDeep(parametersFormGroup) as FormGroup : new FormGroup({}),
        }),
        type: new FormControl(indicator.type)
      });
    }
    return resultFormGroup;
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

  static newEntity(currentProject: Project, entity?: Entity): FormGroup {
    if (!entity) {
      entity = new Entity();
    }

    return new FormGroup({
      id: new FormControl(entity.id, Validators.required),
      name: new FormControl(entity.name, Validators.required),
      start: new FormControl(entity.start ? entity.start : currentProject.start, Validators.required),
      end: new FormControl(entity.end ? entity.end : currentProject.end, Validators.required),
    }, { validators: [DatesHelper.orderedDates('start', 'end')]});
  }

  static newEntityGroup(group?: Group): FormGroup {
    if (!group) {
      group = new Group();
    }
    return new FormGroup({
      id: new FormControl(group.id),
      name: new FormControl(group.name, Validators.required),
      members: new FormControl(group.members.map(x => x.id), Validators.required),
    });
  }

}

