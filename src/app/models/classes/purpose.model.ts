import { Deserializable } from '../interfaces/deserializable.model';
import { OutputElement } from './output-element.model';
import { ProjectIndicator } from './project-indicator.model';
import { v4 as uuid } from 'uuid';

export class Purpose implements Deserializable {
    id: string;
    assumptions: string;
    description: string;
    indicators: ProjectIndicator[] = [];
    outputs: OutputElement[] = [];

    constructor(input?: any) {
        this.deserialize(input);
    }

    deserialize(input: any): this {
        Object.assign(this, input);
        this.id = (input && input.id) ? input.id : uuid();
        this.outputs = ( input && input.outputs ) ? input.outputs.map(x => new OutputElement(x)) : [];
        this.indicators = ( input && input.indicators ) ? input.indicators.map(x => new ProjectIndicator(x)) : [];
        return this;
    }

    serialize() {
      return {
            assumptions: this.assumptions || '',
            description: this.description || '',
            indicators: this.indicators.map(x => x.serialize()),
            outputs: this.outputs.map(x => x.serialize())
        };
    }
}
