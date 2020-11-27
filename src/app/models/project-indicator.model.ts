import { forEach } from 'lodash';
import { Deserializable } from './deserializable.model';

export const PERCENTAGE_FORMULA = '100 * numerator / denominator';
export const PERMILLE_FORMULA = '1000 * numerator / denominator';
export const COPY_FORMULA = 'copied_value';
export const UNAVAIlABLE = 'unavailable';

export class ProjectIndicator implements Deserializable {

    display: string;
    baseline: number;
    target: number;
    colorize: boolean;
    computation = {
        formula: null,
        parameters: {}
    };
    type = UNAVAIlABLE;

    constructor(input?: any) {
        this.deserialize(input);
    }

    deserialize(input: any): this {
      Object.assign(this, input);
      this.colorize = this.colorize ? this.colorize : true;
      if (input && input.computation) {
        this.type = input.type ? input.type : this.type;
        this.computation.formula = input.computation.formula;
        if (input.computation.formula === COPY_FORMULA) {
                this.type = 'copy';
                this.computation.formula = COPY_FORMULA;
                this.computation.parameters = input.computation.parameters;
            } else if (input.computation.formula === PERCENTAGE_FORMULA) {
                this.type = 'percentage';
                this.computation.formula = PERCENTAGE_FORMULA;
                this.computation.parameters = input.computation.parameters;
            } else if (input.computation.formula === PERMILLE_FORMULA) {
                this.type = 'permille';
                this.computation.formula = PERMILLE_FORMULA;
                this.computation.parameters = input.computation.parameters;
            } else if (input.computation.formula && input.computation.parameters === {}){
                this.type = 'formula';
                this.computation.formula = input.computation.formula;
                this.computation.parameters = input.computation.parameters;
            }
        }
      return this;
    }

    private formatComputation(computation): any{
      if (computation) {
        if (computation.formula){
          forEach(computation.parameters, parameter => {
            // This part allows to convert our partitionElement in id
            forEach(parameter.filter, (value, key) => {
              const elementList = [];
              value.map(element => {
                if (typeof(element) !== 'string' ) {
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

    serialize() {
      return {
        baseline: this.baseline,
        colorize: this.colorize,
        computation: this.formatComputation(this.computation),
        display: this.display,
        target: this.target,
      };
    }

}
