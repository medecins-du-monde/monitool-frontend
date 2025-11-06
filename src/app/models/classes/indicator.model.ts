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
    computation: {
        type: string;
        formula: string;
    };
    disabled: boolean;
    rev: string;

    // Depends on parent thematic
    required = false;
    parentDisabled = false;


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
        this.computation = (input && input.computation) ? {
            type: input.computation.type,
            formula: input.computation.formula
        } : null;
        this.disabled = (input && input.disabled) ? input.disabled : false;
        return this;
    }

    serialize() {
        const serialized = {
            _id: this.id,
            type: this.type,
            name: this.name,
            description: this.description,
            themes: this.themes.map(x => x.id),
            computation: this.computation,
            disabled: this.disabled,
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
