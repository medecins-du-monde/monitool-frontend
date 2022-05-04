import { Project } from 'src/app/models/classes/project.model';
import { GroupTitle } from './group-title.model';
import { SectionTitle } from './section-title.model';

export interface InfoRow {
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
    filter?: any;
    computation: any;
    originProject?: Project;
    customFilter?: any;
    nextRow: SectionTitle | GroupTitle | InfoRow;
    open: boolean;
    level: number;
    error?: string[];
  }
