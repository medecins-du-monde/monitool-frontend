import { Deserializable } from '../interfaces/deserializable.model';
import { v4 as uuid } from 'uuid';
import { Entity } from './entity.model';
import { FormElement } from './form-element.model';
import DatesHelper from 'src/app/utils/dates-helper';

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
        this.start = ( input && input.start ) ? DatesHelper.parseDate(input.start) : null;
        this.end = ( input && input.end ) ? DatesHelper.parseDate(input.end) : null;
        this.elements = ( input && input.elements ) ? input.elements.map(x => new FormElement(x)) : [];
        return this;
    }

    serialize() {
        return {
            elements: this.elements.map(x => x.serialize()),
            end: this.end ? DatesHelper.dateToString(this.end) : null,
            entities: this.entities.map(x => x.id),
            id: this.id,
            name: this.name,
            periodicity: this.periodicity,
            start: this.start ? DatesHelper.dateToString(this.start) : null
        };
    }
}
