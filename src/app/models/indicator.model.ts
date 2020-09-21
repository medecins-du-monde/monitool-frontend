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
    }

    deserialize(input: any): this {
        Object.assign(this, input);
        this.name = new MultiLanguage().deserialize(input.name);
        this.description = new MultiLanguage().deserialize(input.description);
        return this;
    }
}