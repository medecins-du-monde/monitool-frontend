import { Deserializable } from './deserializable.model';

export class ExtraIndicator implements Deserializable {

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
