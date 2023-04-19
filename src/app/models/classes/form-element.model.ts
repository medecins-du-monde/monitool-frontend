import { Deserializable } from '../interfaces/deserializable.model';
import { v4 as uuid } from 'uuid';
import { Partition } from './partition.model';

export class FormElement implements Deserializable {
    id: string;
    name: string;
    geoAgg = 'sum';
    timeAgg = 'sum';
    distribution: number;
    partitions: Partition[] = [];
    comments: {
        value: {
          baseline?: string;
          target?: string;
          name?: string;
          [key: string]: string;
        };
        filter: any;
      }[] = [];

    constructor(input?: any) {
        this.deserialize(input);
    }

    deserialize(input: any): this {
        Object.assign(this, input);
        this.id = (input && input.id) ? input.id : uuid();
        this.partitions = (input && input.partitions) ? input.partitions.map(x => new Partition(x)) : [];
        // tslint:disable-next-line: radix
        this.distribution = (input && input.distribution) ? parseInt(input.distribution) : 0;
        return this;
    }

    serialize() {
        return {
            id: this.id,
            name: this.name,
            geoAgg: this.geoAgg,
            timeAgg: this.timeAgg,
            distribution: this.distribution,
            partitions: this.partitions.map(x => x.serialize())
        };
    }
}
