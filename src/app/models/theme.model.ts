import { Deserializable } from './deserializable.model';
import { MultiLanguage } from './multi-language.model';
import { v4 as uuid } from 'uuid';

export class Theme implements Deserializable {
    id: string;
    type = 'theme';
    name: MultiLanguage;
    shortName: MultiLanguage;
    rev: string;

    constructor(input?: any) {
        this.deserialize(input);
    }

    deserialize(input?: any): this {
        Object.assign(this, input);
        this.id = (input && input._id) ? input._id : `theme:${uuid()}`;
        this.name = ( input && input.name ) ? new MultiLanguage(input.name) : new MultiLanguage();
        this.shortName = ( input && input.shortName ) ? new MultiLanguage(input.shortName) : new MultiLanguage();
        this.rev = ( input && input._rev ) ? input._rev : null;
        return this;
    }

    serialize() {
        const serialized = {
            _id: this.id,
            type: this.type,
            name: this.name,
            shortName: this.shortName
        };

        if (this.rev){
            const revSerialized = {
                _rev: this.rev
            };

            Object.assign(revSerialized, serialized);
            return revSerialized;
        }

        return serialized;
    }
}
