import { Deserializable } from './deserializable.model';

export class ProjectIndicator implements Deserializable {

    display: string;
    baseline: number;
    target: number;
    colorize: boolean;
    computation: any;

    constructor(input?: any) {
        this.deserialize(input);
    }

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }

    serialize() {
        return null;
    }
}
