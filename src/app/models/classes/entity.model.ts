import { Deserializable } from '../interfaces/deserializable.model';
import { v4 as uuid } from 'uuid';
import DatesHelper from 'src/app/utils/dates-helper';

export class Entity implements Deserializable {
    id: string;
    name: string;
    start: Date;
    end: Date;

    constructor(input?: any) {
        this.deserialize(input);
    }

    deserialize(input: any): this {
        Object.assign(this, input);
        this.id = ( input && input.id ) ? input.id : uuid();
        this.name = input ? input.name : null;
        this.start = ( input && input.start ) ? DatesHelper.parseDate(input.start) : null;
        this.end = ( input && input.end )  ? DatesHelper.parseDate(input.end) : null;

        return this;
    }

    serialize() {
        return {
            end: this.end ? DatesHelper.dateToString(this.end) : null,
            name: this.name,
            start: this.start ? DatesHelper.dateToString(this.start) : null,
            id: this.id
        };
    }
}
