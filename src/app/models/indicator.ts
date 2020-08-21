import { MultiLanguages } from './multiLanguages';

export interface Indicator {
    name: MultiLanguages;
    description?: MultiLanguages;
    themes: string[];
    type?: string;
    _id?: string;
    _rev?: string;
}
