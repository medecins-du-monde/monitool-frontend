import { forEach } from 'lodash';
import { Deserializable } from '../interfaces/deserializable.model';
import { MultiLanguage } from './multi-language.model';
import { Project } from './project.model';
import { v4 as uuid } from 'uuid';

export const PERCENTAGE_FORMULA = '100 * numerator / denominator';
export const PERMILLE_FORMULA = '1000 * numerator / denominator';
export const CUSTOM_FORMULA = 'A+B+C';
export const COPY_FORMULA = 'copied_value';
export const UNAVAILABLE = 'unavailable';
export const FIXED = 'fixed';
export const COPY = 'copy';
export const PERCENTAGE = 'percentage';
export const PERMILLE = 'permille';
export const FORMULA = 'formula';

import { Theme } from './theme.model';

export class ProjectIndicator implements Deserializable {
  crossCutting = false;
  id: string;
  description: MultiLanguage;
  display: string | MultiLanguage;
  baseline: number;
  target: number;
  colorize: boolean;
  computation = {
    formula: '',
    parameters: {}
  };
  unit: string;
  type = UNAVAILABLE;
  typeList = [FIXED, COPY, PERCENTAGE, PERMILLE, FORMULA];
  themes: Theme[] = [];
  originProject?: Project;
  disaggregatedBy?: { [key in string]: string };
  partitionedBy?: { [key in string]: string };
  isGroup: false;

  constructor(input?: any) {
    this.deserialize(input);
  }

  // Return true if the indicator can be considered as filled
  get filled(): boolean {
    if (this.computation && this.computation.formula) {
      return true;
    }
    else {
      return false;
    }
  }

  deserialize(input: any): this {
    Object.assign(this, input);
    this.display = input ? input.display || input.name : null;
    this.id = (input && input.id) ? input.id : uuid();

    /*If at least one of the baseline and target is null,
    we set the colorize to true so it directly appears as checked
    when we put add the baseline and target in the form. */
    this.colorize = (
        this.baseline === undefined
        || this.baseline === null
      )
      || (this.target === undefined
        || this.target === null) ? true : this.colorize;

    this.unit = null;

    if (input?.computation === null){
      this.computation = {
        formula: '',
        parameters: {}
      };
    }
    if (input && input.computation) {
      this.type = input.type ? input.type : this.type;
      this.computation.formula = input.computation.formula;
      if (input.type === UNAVAILABLE) {
        this.type = UNAVAILABLE;
        this.computation.formula = '';
        this.computation.parameters = {};
      } else if (input.computation.formula === COPY_FORMULA) {
          this.type = COPY;
          this.computation.formula = COPY_FORMULA;
          this.computation.parameters = input.computation.parameters;
        } else if (input.computation.formula === PERCENTAGE_FORMULA) {
          this.type = PERCENTAGE;
          this.unit = '%';
          this.computation.formula = PERCENTAGE_FORMULA;
          this.computation.parameters = input.computation.parameters;
        } else if (input.computation.formula === PERMILLE_FORMULA) {
          this.type = PERMILLE;
          this.unit = '‰';
          this.computation.formula = PERMILLE_FORMULA;
          this.computation.parameters = input.computation.parameters;
        } else if (input.computation.formula !== null && !isNaN(Number(input.computation.formula))) {
          this.type = FIXED;
          this.computation.formula = input.computation.formula;
          this.computation.parameters = {};
        } else if (input.computation.formula !== null) {
          this.type = FORMULA;
          this.computation.formula = input.computation.formula;
          this.computation.parameters = input.computation.parameters;

          if (/1000/.test(input.computation.formula)){
            this.unit = '‰';
          } else if (/100/.test(input.computation.formula)){
            this.unit = '%';
          }

        }
    }

    if (!this.typeList.includes(this.type)) {
      this.type = UNAVAILABLE;
    }
    return this;
  }

  private formatComputation(computation): any {

    if (computation) {
      if (computation.formula) {
        forEach(computation.parameters, parameter => {
          // This part allows to convert our partitionElement in id
          forEach(parameter.filter, (value, key) => {
            const elementList = [];
            value.map(element => {
              if (typeof (element) !== 'string') {
                elementList.push(element.id);
              }
              else { elementList.push(element); }
            });
            // We always add the array to the filter object
            parameter.filter[`${key}`] = elementList;
          });
        });
        return computation;
      }
    }
    return null;
  }


  serialize(crossCuttingType = false) {
    let serializedIndicator: any = {
      baseline: this.baseline,
      target: this.target,
      // Now we check if the colorize is still set to true and if the baseline and target are valid.
      // In the case that the baseline and target are not valid, we set the colorize property to false again.
      colorize: (
        this.baseline !== null
        && this.baseline !== undefined
        && this.target !== null
        && this.target !== undefined) ? this.colorize : false,
      computation: this.formatComputation(this.computation),
      id: this.id,
    };

    if (!crossCuttingType) {
      serializedIndicator = {
        display: this.display,
        ...serializedIndicator
      };
    }

    return serializedIndicator;
  }

}
