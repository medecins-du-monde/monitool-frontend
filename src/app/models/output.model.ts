import { Activity } from './activity.model';
import { Deserializable } from './deserializable.model';
import { ProjectIndicator } from './project-indicator.model';

export class Output implements Deserializable {
    assumptions: string;
    description: string;
    activities: Activity[] = [];
    indicators: ProjectIndicator[] = [];

    constructor(input?: any) {
        this.deserialize(input);
    }

    deserialize(input: any): this {
        Object.assign(this, input);
        this.activities = ( input && input.activities ) ? input.activities.map(x => new Activity(x)) : [];
        return this;
    }

    serialize() {
        return {
            assumptions: this.assumptions,
            description: this.description,
            indicators: [],
            activities: this.activities.map(x => x.serialize())
        };
    }
}
