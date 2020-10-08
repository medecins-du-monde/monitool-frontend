import { Deserializable } from './deserializable.model';
import { ProjectIndicator } from './project-indicator.model';
import { v4 as uuid } from 'uuid';
import { Entity } from './entity.model';
import { Purpose } from './purpose.model';

export class LogicalFrame implements Deserializable {
    id: string;
    name: string;
    goal = '';
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
        this.id = (input && input.id) ? input.id : uuid();
        return this;
    }

    serialize() {
        return {
            id: this.id,
            name: this.name,
            goal: this.goal,
            start: this.start ? this.start.toISOString().slice(0, 10) : null,
            end: this.end ? this.end.toISOString().slice(0, 10) : null,
            entities: this.entities.map(x => x.id),
            purposes: [],
            indicators: []
        };
    }
}
