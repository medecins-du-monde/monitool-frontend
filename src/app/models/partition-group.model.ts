import { Deserializable } from './deserializable.model';
import { v4 as uuid } from 'uuid';
import { PartitionElement } from './partition-element.model';

export class PartitionGroup implements Deserializable {
    id: string;
    name: string;
    members: PartitionElement[] = [];

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
            members: this.members.map(x => x.id)
        };
    }
}
