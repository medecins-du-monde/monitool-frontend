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
        this.indicators = ( input && input.indicators ) ? input.indicators.map(x => new ProjectIndicator(x)) : [];
        return this;
    }

    serialize() {
        return {
            description: this.description || '',
            indicators: this.indicators.map(x => x.serialize()),
        };
    }
}
