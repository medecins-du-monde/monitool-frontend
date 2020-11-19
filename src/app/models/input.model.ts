import { Deserializable } from './deserializable.model';
import { v4 as uuid } from 'uuid';
import { Project } from './project.model';
import { Entity } from './entity.model';
import { Form } from './form.model';

export class Input implements Deserializable {
    id: string;
    type = 'input';
    project: Project;
    entity: Entity;
    form: Form;
    period: string;
    values: number[];


    constructor(input?: any) {
        this.deserialize(input);
    }

    deserialize(input: any): this {
        Object.assign(this, input);
        this.id = (input && input._id) ? input.id : `indicator:${this.project.id}:${this.form.id}:${this.entity.id}:${this.period}`;

        return this;
    }

    serialize() {
        return {
            _id: this.id,
            type: this.type,
            project: this.project.id,
            entity: this.entity.id,
            form: this.form.id,
            period: this.period,
            values: this.values
        };
    }
}
