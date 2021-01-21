import { Deserializable } from '../interfaces/deserializable.model';
import { MultiLanguage } from './multi-language.model';
import { v4 as uuid } from 'uuid';
import { Theme } from './theme.model';

export class Indicator implements Deserializable {
    id: string;
    type = 'indicator';
    name: MultiLanguage;
    description: MultiLanguage;
    themes: Theme[];
    rev: string;

    get multiThemes() {
        return this.themes.length > 1;
    }

    constructor(input?: any) {
        this.deserialize(input);
    }

    deserialize(input: any): this {
        Object.assign(this, input);
        this.id = (input && input._id) ? input._id : `indicator:${uuid()}`;
        this.name = ( input && input.name ) ? new MultiLanguage().deserialize(input.name) : new MultiLanguage();
        this.description = ( input && input.description ) ? new MultiLanguage().deserialize(input.description) : new MultiLanguage();
        this.rev = (input && input._rev) ? input._rev : null;
        return this;
    }

    serialize() {
        const serialized = {
            _id: this.id,
            type: this.type,
            name: this.name,
            description: this.description,
            themes: this.themes.map(x => x.id),
        };

        if (this.rev){
            const novoSerialized = {
                _rev: this.rev
            };
            Object.assign(novoSerialized, serialized);
            return novoSerialized;
        }

        return serialized;
    }
}
