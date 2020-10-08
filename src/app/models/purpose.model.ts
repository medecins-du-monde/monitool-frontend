import { Deserializable } from './deserializable.model';
import { Output } from './output.model';
import { ProjectIndicator } from './project-indicator.model';

export class Purpose implements Deserializable {
    assumtions: string;
    description: string;
    indicators: ProjectIndicator[] = [];
    outputs: Output[] = [];

    constructor(input?: any) {
        this.deserialize(input);
    }

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }

    serialize() {
        return this;
    }
}
