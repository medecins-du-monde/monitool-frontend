import { Deserializable } from './deserializable.model';
import { MultiLanguage } from './multi-language.model';
import { v4 as uuid } from 'uuid';

export class Indicator implements Deserializable {
    id: string;
    type = 'indicator';
    name: MultiLanguage;
    description: MultiLanguage;
    themes: any[];

    constructor(input?: any) {
        this.id = `indicator:${(input && input._id) ? input._id : uuid()}`;
        this.name = ( input && input.name ) ? new MultiLanguage().deserialize(input.name) : new MultiLanguage();
        this.description = ( input && input.description ) ? new MultiLanguage().deserialize(input.description) : new MultiLanguage();
    }

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }

    serialize() {
        return null;
    }
}
