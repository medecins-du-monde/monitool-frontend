import { Indicator } from './indicator';
import { OutputModel } from './outputModel';

export interface Purpose{
    description: string;
    assumptions: string;
    indicators: Indicator[];
    outputs: OutputModel[];

}