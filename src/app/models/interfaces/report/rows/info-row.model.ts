import { Project } from 'src/app/models/classes/project.model';
import { GroupTitle } from './group-title.model';
import { SectionTitle } from './section-title.model';

export interface InfoRow {
    // Comment related props
    id?: string;
    logicalFrameID?: string;
    cellType: string;
    comments: {filter: any, value: any}[];
    entities?: string[];
    purposeID?: string;
    outputID?: string;
    activityID?: string;
    formID?: string;
    
    // Other props
    icon: boolean;
    name: string;
    unit?: string;
    baseline: number | null;
    colorize?: boolean;
    target: number | null;
    sectionId: number;
    values: any;
    onChart?: boolean;
    dataset?: any;
    filterFlag: boolean;
    computation: any;
    originProject?: Project;
    customFilter?: any;
    nextRow: SectionTitle | GroupTitle | InfoRow;
    open: boolean;
    level: number;
    error?: string[];
    start?: Date;
    end?: Date;
  }
