export class MultiLanguages {

    en: string;
    es: string;
    fr: string;

    constructor(multiLanguage) {
        this.en = '';
        this.es = '';
        this.fr = '';

        if (multiLanguage) {
            Object.assign(this, multiLanguage);
        }
    }
}
