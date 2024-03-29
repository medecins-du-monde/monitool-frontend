import { Deserializable } from '../interfaces/deserializable.model';
import { ProjectIndicator } from '../classes/project-indicator.model';
import { v4 as uuid } from 'uuid';

export class Activity implements Deserializable {
    id: string;
    description: string;
    indicators: ProjectIndicator[] = [];

    constructor(input?: any) {
        this.deserialize(input);
    }

    deserialize(input: any): this {
        Object.assign(this, input);
        this.id = (input && input.id) ? input.id : uuid();
        this.indicators = ( input && input.indicators ) ? input.indicators.map(x => new ProjectIndicator(x)) : [];
        return this;
    }

    serialize() {
        return {
            id: this.id,
            description: this.description || '',
            indicators: this.indicators.map(x => x.serialize()),
        };
    }
}
