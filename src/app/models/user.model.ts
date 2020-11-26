import { Deserializable } from './deserializable.model';
import { v4 as uuid } from 'uuid';

export class User implements Deserializable {
    id = 'user:training';
    type: string;
    role: string;
    name: string;

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
        // this.id = `user:${(input && input._id) ? input._id : uuid()}`;
        return this;
    }

    serialize() {
        return {
            id: this.id,
            type: this.type,
            // name: this.name,
            role: this.role
        };
    }
}
