import { Deserializable } from './deserializable.model';
import { v4 as uuid } from 'uuid';
import { Project } from './project.model';
import { Entity } from './entity.model';
import { Form } from './form.model';

export class Input implements Deserializable {
    id: string;
    type = 'input';
    project: string;
    entity: string;
    form: string;
    period: string;
    values: any;
    rev: string;


    constructor(input?: any) {
        this.deserialize(input);
    }

    deserialize(input: any): this {
        Object.assign(this, input);
        this.id = (input && input._id) ? input._id : `input:${this.project}:${this.form}:${this.entity}:${this.period}`;

        if (input && input._rev){
            this.rev = input._rev;
        }
        return this;
    }

    serialize() {
        const serialized = {
            _id: this.id,
            type: this.type,
            project: this.project,
            entity: this.entity,
            form: this.form,
            period: this.period,
            values: this.values
        };
        if (this.rev){
            Object.assign(serialized, {
                _rev: this.rev
            });
        }
        return serialized;
    }
}
