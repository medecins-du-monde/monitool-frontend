import { forEach } from 'lodash';
import { Deserializable } from '../interfaces/deserializable.model';
import { MultiLanguage } from './multi-language.model';

export const PERCENTAGE_FORMULA = '100 * numerator / denominator';
export const PERMILLE_FORMULA = '1000 * numerator / denominator';
export const COPY_FORMULA = 'copied_value';
export const UNAVAIlABLE = 'unavailable';
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
  display: string;
  baseline: number;
  target: number;
  colorize: boolean;
  computation = {
    formula: null,
    parameters: {}
  };
  type = UNAVAIlABLE;
  typeList = [ FIXED, COPY, PERCENTAGE, PERMILLE, FORMULA];
  themes: Theme[] = [];

  constructor(input?: any) {
    this.deserialize(input);
  }

  deserialize(input: any): this {
    Object.assign(this, input);
    this.colorize = this.colorize ? this.colorize : true;
    this.display = input ? input.display || (input.name ? input.name.en : null) : null;
    if (input && input.computation) {
      this.type = input.type ? input.type : this.type;
      this.computation.formula = input.computation.formula;
      if (input.type === UNAVAIlABLE) {
        this.type = UNAVAIlABLE;
        this.computation.formula = '';
        this.computation.parameters = {};
      }
      else
        if (input.computation.formula === COPY_FORMULA) {
          this.type = COPY;
          this.computation.formula = COPY_FORMULA;
          this.computation.parameters = input.computation.parameters;
        } else if (input.computation.formula === PERCENTAGE_FORMULA) {
          this.type = PERCENTAGE;
          this.computation.formula = PERCENTAGE_FORMULA;
          this.computation.parameters = input.computation.parameters;
        } else if (input.computation.formula === PERMILLE_FORMULA) {
          this.type = PERMILLE;
          this.computation.formula = PERMILLE_FORMULA;
          this.computation.parameters = input.computation.parameters;
        }

        else if (input.computation.formula !== null && !isNaN(Number(input.computation.formula))) {
          this.type = FIXED;
          this.computation.formula = input.computation.formula;
          this.computation.parameters = {};
        }
        else if (input.computation.formula !== null) {
          this.type = FORMULA;
          this.computation.formula = input.computation.formula;
          this.computation.parameters = input.computation.parameters;
        }

    }

    if (!this.typeList.includes(this.type)) {
      this.type = UNAVAIlABLE;
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
            parameter.filter[`${key}`] = elementList;
          });
        });
        return computation;
      }
    }
    return null;
  }


  serialize(crossCuttingType = false) {
    const serializedIndicator = {
      baseline: this.baseline,
      colorize: (this.baseline && this.target) ? true : false,
      computation: this.formatComputation(this.computation),
      target: this.target,
    };
    // tslint:disable-next-line: no-string-literal
    if (!crossCuttingType) { serializedIndicator['display'] = this.display; }
    return serializedIndicator;
  }

}
