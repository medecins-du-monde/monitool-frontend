import { Deserializable } from './deserializable.model';

export class MultiLanguage implements Deserializable {
    en = '';
    fr = '';
    es = '';

    constructor(input?: any) {
        this.deserialize(input);
    }

    deserialize(input?: any): this {
        Object.assign(this, input);
        return this;
    }
}
