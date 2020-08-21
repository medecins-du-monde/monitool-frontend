import { Indicator } from './indicator';
import { MultiLanguages } from './multiLanguages';

export interface IndicatorsGroup {
    thematic: MultiLanguages;
    indicators: Indicator[];
}
