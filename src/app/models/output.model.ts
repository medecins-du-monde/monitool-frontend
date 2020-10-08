import { Activity } from './activity.model';
import { Deserializable } from './deserializable.model';
import { ProjectIndicator } from './project-indicator.model';

export class Output implements Deserializable {
    assumtions: string;
    description: string;
    activities: Activity[] = [];
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
