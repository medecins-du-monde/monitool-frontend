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

    constructor(input?: any, globalEntities?: Entity[]) {
        this.deserialize(input, globalEntities);
    }

    get periodicityDisplay(): string {
        return `Enum.Periodicity.${this.periodicity}`;
    }

    deserialize(input: any, globalEntities?: Entity[]): this {
        Object.assign(this, input);
        this.id = (input && input.id) ? input.id : uuid();
        this.periodicity = ( input && input.periodicity ) ? input.periodicity : 'month';
        this.start = ( input && input.start && this.periodicity !== 'free') ? DatesHelper.parseDate(input.start) : null;
        this.end = ( input && input.end && this.periodicity !== 'free') ? DatesHelper.parseDate(input.end) : null;
        this.elements = ( input && input.elements ) ? input.elements.map(x => new FormElement(x)) : [];

        // recognizes when input.entites is a list of Entities id's instead of Entity objects
        this.entities = [];
        if (input && input.entities){
            for (let ambiguousEntity of input.entities){
                if (typeof ambiguousEntity === 'string' && globalEntities){
                    let ambiguousEntityId: string = ambiguousEntity
                    ambiguousEntity = globalEntities.find(e => e.id = ambiguousEntityId);
                }
                this.entities.push(ambiguousEntity);
            }
        }

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
