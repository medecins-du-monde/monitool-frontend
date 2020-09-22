import { Deserializable } from './deserializable.model';
import { v4 as uuid } from 'uuid';
import { Theme } from './theme.model';

export class Project implements Deserializable {
    id: string;
    type = 'project';
    name: string;
    active: boolean;
    start: Date;
    end: Date;
    inputDate: Date;
    country: string;
    themes: Theme[];
    crossCutting: any[];
    extraIndicators: any[];
    logicalFrames: any[];
    entities: any[];
    groups: any[];
    forms: any[];
    users: any[];
    visibility: string;

    get status() {
        if ( this.active ) {
            return this.end > new Date() ? 'Ongoing' : 'Finished';
        }
        return 'Deleted';
    }

    get countryImage() {
        if ( this.country === 'Burkina Faso' ) {
            return 'assets/images/burkina-flag.png';
        } else {
            return 'assets/images/italy-flag.png';
        }
    }

    constructor(input?: any) {
        this.deserialize(input);
    }

    deserialize(input: any): this {
        Object.assign(this, input);
        this.id = `project:${(input && input._id) ? input._id : uuid()}`;
        this.start = input ? new Date(input.start) : new Date();
        this.end = input ? new Date(input.end) : new Date();
        return this;
    }

    serialize() {
        return null;
    }
}
