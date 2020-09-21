import { Deserializable } from './deserializable.model';
import { v4 as uuid } from 'uuid';

export class Project implements Deserializable {
    id: string;
    type = 'project';
    name: string;
    active: boolean;
    start: Date;
    end: Date;
    themes: any[];
    crossCutting: any[];
    extraIndicators: any[];
    logicalFrames: any[];
    entities: any[];
    groups: any[];
    forms: any[];
    users: any[];
    visibility: string;

    constructor(input?: any) {
        this.id = `project:${(input && input._id) ? input._id : uuid()}`;
    }

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
}
