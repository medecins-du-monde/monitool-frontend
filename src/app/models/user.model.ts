import { Deserializable } from './deserializable.model';
import { v4 as uuid } from 'uuid';
import { Entity } from './entity.model';
import { Form } from './form.model';

export class User implements Deserializable {
    id: string;
    type = 'user';
    role: string;
    name: string;
    username: string;
    password: string;
    entities: Entity[];
    dataSources: Form[];

    get login() {
        return this.id.split(':')[1];
    }

    get roleDisplay() {
        return this.role.charAt(0).toUpperCase() + this.role.slice(1) + 'Role';
    }

    get email() {
        return `${this.login}@medecinsdumonde.net`;
    }

    constructor(input?: any) {
        this.deserialize(input);
    }

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }

    serialize() {
        const value = {
            id: this.id,
            type: this.type,
            role: this.role
        };

        if (this.entities){
            Object.assign(value, {
                entities: this.entities.map(x => x.id)
            });
        }

        if (this.dataSources){
            Object.assign(value, {
                dataSources: this.dataSources.map(x => x.id)
            });
        }

        return value;
    }
}
