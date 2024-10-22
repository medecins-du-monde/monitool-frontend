import { UntypedFormArray, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
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

  static newPurpose(purpose?: Purpose): UntypedFormGroup {
    if (!purpose) {
      purpose = new Purpose();
    }
    return new UntypedFormGroup({
      id: new UntypedFormControl(purpose.id),
      assumptions: new UntypedFormControl(purpose.assumptions),
      description: new UntypedFormControl(purpose.description, Validators.required),
      outputs: new UntypedFormArray(purpose.outputs.map(x => this.newOutput(x))),
      indicators: new UntypedFormArray(purpose.indicators.map(x => this.newIndicator(x))),
    });
  }

  static newOutput(output?: OutputElement): UntypedFormGroup {
    if (!output) {
      output = new OutputElement();
    }
    return new UntypedFormGroup({
      id: new UntypedFormControl(output.id),
      assumptions: new UntypedFormControl(output.assumptions),
      description: new UntypedFormControl(output.description, Validators.required),
      activities: new UntypedFormArray(output.activities.map(x => this.newActivity(x))),
      indicators: new UntypedFormArray(output.indicators.map(x => this.newIndicator(x))),
    });
  }

  static newActivity(activity?: Activity): UntypedFormGroup {
    if (!activity) {
      activity = new Activity();
    }
    return new UntypedFormGroup({
      id: new UntypedFormControl(activity.id),
      description: new UntypedFormControl(activity.description),
      indicators: new UntypedFormArray(activity.indicators.map(x => this.newIndicator(x))),
    });
  }

  static newIndicator(indicatorToEdit = null, crossCutting = false): UntypedFormGroup {
    const indicator = new ProjectIndicator(indicatorToEdit);

    const parametersFormGroup = new UntypedFormGroup({});

    if (indicator.computation) {
      forEach(indicator.computation.parameters, (parameter, key) => {
        const filterGroup = new UntypedFormGroup({});

        // eslint-disable-next-line @typescript-eslint/dot-notation
        forEach(parameter['filter'], (filterValue: string[], keyFilter: string) => {
        filterGroup.addControl(`${keyFilter}`, new UntypedFormControl(filterValue)); });
        parametersFormGroup.addControl(`${key}`, new UntypedFormGroup({
          // eslint-disable-next-line @typescript-eslint/dot-notation
          elementId: new UntypedFormControl (parameter['elementId'], Validators.required),
          filter: filterGroup as UntypedFormGroup,
        }));
      });
    }
    // TODO: Review to have a way to do it cleaner

    let resultFormGroup;
    if (crossCutting) {
      resultFormGroup = new UntypedFormGroup({
        crossCutting: new UntypedFormControl(true, Validators.required),
        id: new UntypedFormControl(indicator.id, Validators.required),
        description: indicator.description ? new UntypedFormGroup({
          en: new UntypedFormControl(indicator.description.en),
          es: new UntypedFormControl(indicator.description.es),
          fr: new UntypedFormControl(indicator.description.fr),
        }) : new UntypedFormControl(null),
        display: new UntypedFormControl(indicator.display),
        baseline: new UntypedFormControl(indicator.baseline),
        target: new UntypedFormControl(indicator.target),
        unit: new UntypedFormControl(indicator.unit),
        colorize: new UntypedFormControl(indicator.colorize),
        computation: new UntypedFormGroup({
          formula: new UntypedFormControl(indicator.computation ? indicator.computation.formula : null),
          parameters: indicator.computation ? _.cloneDeep(parametersFormGroup) as UntypedFormGroup : new UntypedFormGroup({}),
        }),
        type: new UntypedFormControl(indicator.type),
        configured: new UntypedFormControl(indicatorToEdit.configured)
      });
    }
    else {
      resultFormGroup = new UntypedFormGroup({
        id: new UntypedFormControl(indicator.id, Validators.required),
        display: new UntypedFormControl(indicator.display, Validators.required),
        baseline: new UntypedFormControl(indicator.baseline),
        target: new UntypedFormControl(indicator.target),
        unit: new UntypedFormControl(indicator.unit),
        colorize: new UntypedFormControl(indicator.colorize),
        computation: new UntypedFormGroup({
          formula: new UntypedFormControl(indicator.computation ? indicator.computation.formula : null),
          parameters: indicator.computation ? _.cloneDeep(parametersFormGroup) as UntypedFormGroup : new UntypedFormGroup({}),
        }),
        type: new UntypedFormControl(indicator.type)
      });
    }
    return resultFormGroup;
  }

  static newTheme(theme?: Theme): UntypedFormGroup {
    if (!theme) {
      theme = new Theme();
    }
    return new UntypedFormGroup({
      id: new UntypedFormControl(theme.id, Validators.required),
      type: new UntypedFormControl(theme.type, Validators.required),
      name: new UntypedFormControl(theme.name, Validators.required),
      shortName: new UntypedFormControl(theme.shortName, Validators.required),
      rev: new UntypedFormControl(theme.rev, Validators.required),
    });
  }

  static newIndicatorGroup(group?: {theme: Theme, indicators: ProjectIndicator[]}): UntypedFormGroup {
    if (!group) {
      const theme = new Theme();
      const indicators: ProjectIndicator[] = [];
      group = {theme, indicators};
    }
    return new UntypedFormGroup({
      theme: this.newTheme(group.theme),
      indicators: new UntypedFormArray(group.indicators.map(indicator => this.newIndicator(indicator, true))),
    });
  }

  static newEntity(currentProject: Project, entity?: Entity): UntypedFormGroup {
    if (!entity) {
      entity = new Entity();
    }

    return new UntypedFormGroup({
      id: new UntypedFormControl(entity.id, Validators.required),
      name: new UntypedFormControl(entity.name, Validators.required),
      start: new UntypedFormControl(entity.start ? entity.start : currentProject.start, Validators.required),
      end: new UntypedFormControl(entity.end ? entity.end : currentProject.end, Validators.required),
    }, { validators: [DatesHelper.orderedDates('start', 'end')]});
  }

  static newEntityGroup(group?: Group): UntypedFormGroup {
    if (!group) {
      group = new Group();
    }
    return new UntypedFormGroup({
      id: new UntypedFormControl(group.id),
      name: new UntypedFormControl(group.name, Validators.required),
      members: new UntypedFormControl(group.members.map(x => x.id), Validators.required),
    });
  }

}

