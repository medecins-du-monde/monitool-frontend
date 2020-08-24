import { MultiLanguages } from './multiLanguages';

export interface Theme {
    _id: string;
    _rev: string;
    name: MultiLanguages;
    shortName: MultiLanguages;
    type: string;
}
