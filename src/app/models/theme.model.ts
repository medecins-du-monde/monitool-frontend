import { Deserializable } from './deserializable.model';
import { MultiLanguage } from './multi-language.model';
import { v4 as uuid } from 'uuid';

export class Theme implements Deserializable {
    id: string;
    type = 'theme';
    name: MultiLanguage;
    shortName: MultiLanguage;

    constructor(input?: any) {
        this.id = `theme:${(input && input._id) ? input._id : uuid()}`;
    }

    deserialize(input: any): this {
        Object.assign(this, input);
        this.name = new MultiLanguage().deserialize(input.name);
        this.shortName = new MultiLanguage().deserialize(input.shortName);
        return this;
    }
}
