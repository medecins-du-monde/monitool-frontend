import { Deserializable } from './deserializable.model';
import { v4 as uuid } from 'uuid';
import { PartitionElement } from './partition-element.model';
import { PartitionGroup } from './partition-group.model';

export class Partition implements Deserializable {
    id: string;
    name: string;
    aggregation = 'sum';
    elements: PartitionElement[] = [];
    groups: PartitionGroup[] = [];
    useGroups = false;

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
            return group;
        }) : [];
        this.useGroups = this.groups.length > 0;
        return this;
    }

    serialize() {
        return {
            id: this.id,
            name: this.name,
            aggregation: this.aggregation,
            elements: this.elements.map(x => x.serialize()),
            groups: this.useGroups ? this.groups.map(x => x.serialize()) : []
        };
    }
}
