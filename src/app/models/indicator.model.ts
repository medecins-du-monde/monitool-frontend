import { Deserializable } from './deserializable.model';
import { MultiLanguage } from './multi-language.model';
import { v4 as uuid } from 'uuid';
import { Theme } from './theme.model';

export class Indicator implements Deserializable {
    id: string;
    type = 'indicator';
    name: MultiLanguage;
    description: MultiLanguage;
    themes: Theme[];

    constructor(input?: any) {
        this.deserialize(input);
    }

    deserialize(input: any): this {
        Object.assign(this, input);
        this.id = (input && input._id) ? input._id : `indicator:${uuid()}`;
        this.name = ( input && input.name ) ? new MultiLanguage().deserialize(input.name) : new MultiLanguage();
        this.description = ( input && input.description ) ? new MultiLanguage().deserialize(input.description) : new MultiLanguage();
        return this;
    }

    serialize() {
        return {
            _id: this.id,
            type: this.type,
            name: this.name,
            description: this.description,
            themes: this.themes.map(x => x.id)
        };
    }
}
