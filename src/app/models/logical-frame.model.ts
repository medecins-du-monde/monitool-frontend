import { Deserializable } from './deserializable.model';
import { ProjectIndicator } from './project-indicator.model';
import { v4 as uuid } from 'uuid';
import { Entity } from './entity.model';

interface Activity {
    description: string;
    indicators: ProjectIndicator[];
}

interface Output {
    assumtions: string;
    description: string;
    activities: Activity[];
    indicators: ProjectIndicator[];
}

interface Purpose {
    assumtions: string;
    description: string;
    indicators: ProjectIndicator[];
    outputs: Output[];
}

export class LogicalFrame implements Deserializable {
    id: string;
    name: string;
    goal: string;
    start: Date;
    end: Date;
    entities: Entity[] = [];
    indicators: ProjectIndicator[] = [];
    purposes: Purpose[] = [];

    constructor(input?: any) {
        this.deserialize(input);
    }

    deserialize(input: any): this {
        Object.assign(this, input);
        this.id = (input && input._id) ? input._id : uuid();
        return this;
    }

    serialize() {
        return this;
    }
}
