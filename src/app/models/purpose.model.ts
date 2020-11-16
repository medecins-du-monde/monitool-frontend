import { Deserializable } from './deserializable.model';
import { OutputElement } from './output-element.model';
import { ProjectIndicator } from './project-indicator.model';

export class Purpose implements Deserializable {
    assumptions: string;
    description: string;
    indicators: ProjectIndicator[] = [];
    outputs: OutputElement[] = [];

    constructor(input?: any) {
        this.deserialize(input);
    }

    deserialize(input: any): this {
        Object.assign(this, input);
        this.outputs = ( input && input.outputs ) ? input.outputs.map(x => new OutputElement(x)) : [];
        this.indicators = ( input && input.indicators ) ? input.indicators.map(x => new ProjectIndicator(x)) : [];
        return this;
    }

    serialize() {
      return {
            assumptions: this.assumptions,
            description: this.description,
            indicators: this.indicators.map(x => x.serialize()),
            outputs: this.outputs.map(x => x.serialize())
        };
    }
}
