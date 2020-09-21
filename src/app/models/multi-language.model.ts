import { Deserializable } from './deserializable.model';

export class MultiLanguage implements Deserializable {
    en: string;
    fr: string;
    es: string;

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
}
