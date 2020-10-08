import { Deserializable } from './deserializable.model';
import { ProjectIndicator } from './project-indicator.model';

export class Activity implements Deserializable {
    description: string;
    indicators: ProjectIndicator[] = [];

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
