import { Filter } from 'src/app/components/report/filter/filter.component';
import { Deserializable } from '../interfaces/deserializable.model';
import { v4 as uuid } from 'uuid';
import DatesHelper from 'src/app/utils/dates-helper';

export class DashboardChart implements Deserializable {
    id: string;
    type: string;
    title?: string;
    meta: {
        dimension: string;
        filter: Filter;
    };
    datasets: {
        backgroundColor: string;
        borderColor: string;
        meta: {
            computation: {
                formula: string;
                parameters: any;
            }
            filter: Filter;
        };
        label: string;
        baseline?: number;
        target?: number;
        unit?: string;
    }[];
    comment?: {
        content: string;
        meta: {
            lastEditUser: string;
            lastEditDate: string;
        };
    }

    constructor(input?: any) {
        this.deserialize(input);
    }

    deserialize(input?: any): this {
        Object.assign(this, input);
        this.id = ( input && input.id ) ? input.id : uuid();
        return this;
    }

    serialize(): this {
        return this;
    }
}
