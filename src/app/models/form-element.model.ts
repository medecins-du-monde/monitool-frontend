import { Deserializable } from './deserializable.model';
import { v4 as uuid } from 'uuid';
import { Partition } from './partition.model';

export class FormElement implements Deserializable {
    id: string;
    name: string;
    geoAgg = 'sum';
    timeAgg = 'sum';
    distribution = 0;
    partitions: Partition[] = [];

    constructor(input?: any) {
        this.deserialize(input);
    }

    deserialize(input: any): this {
        Object.assign(this, input);
        this.id = (input && input.id) ? input.id : uuid();
        this.partitions = (input && input.partitions) ? input.partitions.map(x => new Partition(x)) : [];
        return this;
    }

    serialize() {
        return this;
    }
}
