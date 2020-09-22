import { Deserializable } from './deserializable.model';
import { v4 as uuid } from 'uuid';

export class User implements Deserializable {
    id: string;
    type = 'user';
    role: string;
    name: string;

    get login() {
        return this.id.split(':')[1];
    }

    get roleDisplay() {
        return this.role === 'admin' ? 'Admin' : 'Common';
    }

    constructor(input?: any) {
        this.deserialize(input);
    }

    deserialize(input: any): this {
        Object.assign(this, input);
        this.id = `user:${(input && input._id) ? input._id : uuid()}`;
        return this;
    }

    serialize() {
        return {
            _id: this.id,
            type: this.type,
            name: this.name,
            role: this.role
        };
    }
}
