import { Activity } from './activity.model';
import { Deserializable } from '../interfaces/deserializable.model';
import { ProjectIndicator } from './project-indicator.model';
import { v4 as uuid } from 'uuid';

export class OutputElement implements Deserializable {
    id: string;
    assumptions: string;
    description: string;
    activities: Activity[] = [];
    indicators: ProjectIndicator[] = [];

    constructor(input?: any) {
        this.deserialize(input);
    }

    deserialize(input: any): this {
        Object.assign(this, input);
        this.id = (input && input.id) ? input.id : uuid();
        this.activities = ( input && input.activities ) ? input.activities.map(x => new Activity(x)) : [];
        this.indicators = ( input && input.indicators ) ? input.indicators.map(x => new ProjectIndicator(x)) : [];
        return this;
    }

    serialize() {
        return {
            assumptions: this.assumptions || '',
            description: this.description || '',
            indicators: this.indicators.map(x => x.serialize()),
            activities: this.activities.map(x => x.serialize())
        };
    }
}
