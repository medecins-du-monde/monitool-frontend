import { Deserializable } from '../interfaces/deserializable.model';
import { ProjectIndicator } from '../classes/project-indicator.model';

export class Activity implements Deserializable {
    id?: string;
    comment: {
        value: { [key: string]: string },
        filter: any
    }[] = [];
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
