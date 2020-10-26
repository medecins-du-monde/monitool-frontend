import { Deserializable } from './deserializable.model';

export const PERCENTAGE_FORMULA = '100 * numerator / denominator';
export const PERMILLE_FORMULA = '1000 * numerator / denominator';
export const COPY_FORMULA = 'copied_value';

export class ProjectIndicator implements Deserializable {

    display: string;
    baseline: number;
    target: number;
    colorize: boolean;
    computation = {
        formula: null,
        parameters: {}
    };
    type = 'unavailable';

    constructor(input?: any) {
        this.deserialize(input);
    }

    deserialize(input: any): this {
        Object.assign(this, input);
        this.colorize = this.colorize ? this.colorize : true;
        if (input && input.formula) {
            if (!isNaN(input.formula)) {
                this.type = 'fixed';
                this.computation.formula = input.formula;
                this.computation.parameters = {};
            } else if (input.formula === COPY_FORMULA) {
                this.type = 'copy';
                this.computation.formula = COPY_FORMULA;
                this.computation.parameters = input.parameters;
            } else if (input.formula === PERCENTAGE_FORMULA) {
                this.type = 'percentage';
                this.computation.formula = PERCENTAGE_FORMULA;
                this.computation.parameters = input.parameters;
            } else if (input.formula === PERMILLE_FORMULA) {
                this.type = 'permille';
                this.computation.formula = PERMILLE_FORMULA;
                this.computation.parameters = input.parameters;
            } else {
                this.type = 'formula';
                this.computation.formula = input.formula;
                this.computation.parameters = input.parameters;
            }
        }
        return this;
    }

    serialize() {
      return {
        baseline: this.baseline,
        colorize: this.colorize,
        computation: this.computation,
        display: this.display,
        target: this.target,
        // type: this.type,
      };
    }

}
