import { Deserializable } from './deserializable.model';
import { v4 as uuid } from 'uuid';

export class User implements Deserializable {
    id: string;
    type = 'user';
    role: string;
    name: string;

    constructor(input?: any) {
        this.id = `user:${(input && input._id) ? input._id : uuid()}`;
    }

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
}
