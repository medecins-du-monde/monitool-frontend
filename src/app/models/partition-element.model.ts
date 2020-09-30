import { Deserializable } from './deserializable.model';
import { v4 as uuid } from 'uuid';

export class PartitionElement implements Deserializable {
    id: string;
    name: string;

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
            name: this.name
        };
    }
}
