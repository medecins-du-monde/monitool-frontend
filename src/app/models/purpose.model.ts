import { Deserializable } from './deserializable.model';
import { Output } from './output.model';
import { ProjectIndicator } from './project-indicator.model';

export class Purpose implements Deserializable {
    assumptions: string;
    description: string;
    indicators: ProjectIndicator[] = [];
    outputs: Output[] = [];

    constructor(input?: any) {
        this.deserialize(input);
    }

    deserialize(input: any): this {
        Object.assign(this, input);
        this.outputs = ( input && input.outputs ) ? input.outputs.map(x => new Output(x)) : [];
        return this;
    }

    serialize() {
        return {
            assumptions: this.assumptions,
            description: this.description,
            indicators: [],
            outputs: this.outputs.map(x => x.serialize())
        };
    }
}
