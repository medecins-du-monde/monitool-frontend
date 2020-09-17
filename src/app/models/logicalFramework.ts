import { Indicator } from './indicator';
import { Purpose } from './purpose';

export interface LogicalFramework{
    name: string;
    goal: string;
    indicators: Indicator[];
    purposes: Purpose[];
    id: string;
    end: Date;
    start: Date;
    collectionSites: string[];
    entities: string[];
}
