import { Deserializable } from '../interfaces/deserializable.model';

export class DashboardChart implements Deserializable {
    

    constructor(input?: any) {
        this.deserialize(input);
    }

    deserialize(input?: any): this {
        Object.assign(this, input);
        return this;
    }
}
