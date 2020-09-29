import { Deserializable } from './deserializable.model';
import { v4 as uuid } from 'uuid';
import { PartitionElement } from './partition-element.model';
import { PartitionGroup } from './partition-group.model';

export class Partition implements Deserializable {
    id: string;
    name: string;
    aggreagation: string;
    elements: PartitionElement[] = [];
    groups: PartitionGroup[] = [];

    constructor(input?: any) {
        this.deserialize(input);
    }

    deserialize(input: any): this {
        Object.assign(this, input);
        this.id = (input && input.id) ? input.id : uuid();
        this.elements = (input && input.elements) ? input.elements.map(x => new PartitionElement(x)) : [];
        this.groups = (input && input.groups) ? input.groups.map(x => {
            const group = new PartitionGroup(x);
            group.members = this.elements.filter(e => x.members.indexOf(e.id) >= 0);
        }) : [];
        return this;
    }

    serialize() {
        return this;
    }
}
