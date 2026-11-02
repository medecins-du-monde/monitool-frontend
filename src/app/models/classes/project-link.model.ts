import { Deserializable } from '../interfaces/deserializable.model';
import { v4 as uuid } from 'uuid';

export class ProjectLink implements Deserializable {
    id: string;
    title: string;
    url: string;

    constructor(input?: any) {
        this.deserialize(input);
    }

    deserialize(input?: any): this {
        this.id = (input && input.id) ? input.id : uuid();
        this.title = input && input.title ? input.title : '';
        this.url = input && input.url ? input.url : '';
        return this;
    }

    serialize(): { id: string; title: string; url: string } {
        return { id: this.id, title: this.title.trim(), url: this.url.trim() };
    }
}
