import { Activity } from './activity';
import { Indicator } from './indicator';

export interface OutputModel{
description: string;
assumptions: string;
indicators: Indicator[];
activities: Activity[];
}