import { Deserializable } from './deserializable.model';
import { v4 as uuid } from 'uuid';
import { Entity } from './entity.model';
import { FormElement } from './form-element.model';

export class Form implements Deserializable {
    id: string;
    name: string;
    start: Date;
    end: Date;
    periodicity: string;
    elements: FormElement[] = [];
    entities: Entity[] = [];

    constructor(input?: any) {
        this.deserialize(input);
    }

    get periodicityDisplay() {
        return `Enum.Periodicity.${this.periodicity}`;
    }

    deserialize(input: any): this {
        Object.assign(this, input);
        this.id = (input && input.id) ? input.id : uuid();
        this.periodicity = ( input && input.periodicity ) ? input.periodicity : 'month';
        this.start = ( input && input.start ) ? new Date(input.start) : null;
        this.end = ( input && input.end ) ? new Date(input.end) : null;
        this.elements = ( input && input.elements ) ? input.elements.map(x => new FormElement(x)) : [];
        return this;
    }

    serialize() {
        return {
            elements: this.elements.map(x => x.serialize()),
            end: this.end ? this.end.toISOString().slice(0, 10) : null,
            entities: this.entities.map(x => x.id),
            id: this.id,
            name: this.name,
            periodicity: this.periodicity,
            start: this.start ? this.start.toISOString().slice(0, 10) : null
        };
    }
}
