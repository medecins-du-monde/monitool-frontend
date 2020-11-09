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
            type: this.type,
            role: this.role
        };

        if (this.type === 'internal'){
            if (this.id){
                Object.assign(value, {
                    id: this.id
                });
            }
        }
        else if (this.type === 'partner'){
            Object.assign(value, {
                username: this.username,
                name: this.name,
                password: this.password
            });
        }

        if (this.role === 'input'){
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
        }

        return value;
    }
}
