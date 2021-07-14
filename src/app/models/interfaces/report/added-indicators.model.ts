import { InfoRow } from './rows/info-row.model';
import { ProjectIndicator } from 'src/app/models/classes/project-indicator.model';

export interface AddedIndicators {
    indicator: InfoRow;
    disaggregatedIndicators?: ProjectIndicator[];
    splitBySites?: boolean;
    splitByTime?: string;
  }
