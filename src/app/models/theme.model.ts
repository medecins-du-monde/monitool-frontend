import { Deserializable } from './deserializable.model';
import { MultiLanguage } from './multi-language.model';
import { v4 as uuid } from 'uuid';

export class Theme implements Deserializable {
    id: string;
    type = 'theme';
    name: MultiLanguage;
    shortName: MultiLanguage;

    constructor(input?: any) {
        this.deserialize(input);
    }

    deserialize(input?: any): this {
        Object.assign(this, input);
        this.id = (input && input._id) ? input._id : `theme:${uuid()}`;
        this.name = ( input && input.name ) ? new MultiLanguage(input.name) : new MultiLanguage();
        this.shortName = ( input && input.shortName ) ? new MultiLanguage(input.shortName) : new MultiLanguage();
        return this;
    }

    serialize() {
        return {
            _id: this.id,
            type: this.type,
            name: this.name,
            shortName: this.shortName
        };
    }
}
