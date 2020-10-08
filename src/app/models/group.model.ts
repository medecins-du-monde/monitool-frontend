import { Deserializable } from './deserializable.model';
import { Entity } from './entity.model';
import { v4 as uuid } from 'uuid';

export class Group implements Deserializable {
    id: string;
    name: string;
    members: Entity[] = [];

    constructor(input?: any) {
        this.deserialize(input);
    }

    deserialize(input: any): this {
        Object.assign(this, input);
        this.id = input ? (input.id ? input.id : uuid()) : uuid();
        this.name = input ? input.name : null;
        this.members = input ? input.members : null;
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
