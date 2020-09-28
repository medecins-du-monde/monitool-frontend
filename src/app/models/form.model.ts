import { Deserializable } from './deserializable.model';
import { v4 as uuid } from 'uuid';

export class Form implements Deserializable {
    id: string;
    name: string;
    start: Date;
    end: Date;
    periodicity: string;
    elements: any[];
    entities: any[];

    constructor(input?: any) {
        this.deserialize(input);
    }

    deserialize(input: any): this {
        Object.assign(this, input);
        this.id = (input && input.id) ? input.id : uuid();
        this.start = input ? new Date(input.start) : null;
        this.end = input ? new Date(input.end) : null;
        this.elements = [];
        this.entities = [];
        return this;
    }

    serialize() {
        return null;
    }
}
