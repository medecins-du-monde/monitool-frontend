import { Deserializable } from './deserializable.model';
import { v4 as uuid } from 'uuid';
import { Theme } from './theme.model';
import { Form } from './form.model';
import { ExtraIndicator } from './extra-indicator.model';

export class Project implements Deserializable {
    id: string;
    type = 'project';
    name: string;
    active: boolean;
    start: Date;
    end: Date;
    inputDate: Date;
    country: string;
    themes: Theme[];
    crossCutting: any[];
    extraIndicators: ExtraIndicator[];
    logicalFrames: any[];
    entities: any[];
    groups: any[];
    forms: Form[];
    users: any[];
    visibility: string;

    get status() {
        if ( this.active ) {
            return this.end > new Date() ? 'Ongoing' : 'Finished';
        }
        return 'Deleted';
    }

    get percentages() {
        return {
            basics: ( this.name && this.country && this.themes.length > 0 ) ? 100 : 0,
            sites: ( this.entities.length > 0 ) ? 100 : 0,
            logicalFrames: ( this.logicalFrames.length > 0 ) ? 100 : 0,
            logicalFramesOther: ( this.logicalFrames.length > 1 ) ? 100 : 0,
            extraIndicators: ( this.extraIndicators.length > 0 ) ? 100 : 0,
            logicalFramesUpdate: 0,
            crossCuttingUpdate: 0,
            extraIndicatorsUpdate: 0
            // lfIndicatorsDone: lfIndicators.filter(i => !!i.computation).length / lfIndicators.length,
            // ccIndicatorsDone: ccIndicators.filter(i => !!this.project.crossCutting[i._id]).length / ccIndicators.length,
            // extraIndicatorsDone: this.project.extraIndicators.filter(i => !!i.computation).length / this.project.extraIndicators.length
        };
    }

    get countryImage() {
        if ( this.country === 'Burkina Faso' ) {
            return 'assets/images/burkina-flag.png';
        } else {
            return 'assets/images/italy-flag.png';
        }
    }

    constructor(input?: any) {
        this.deserialize(input);
    }

    deserialize(input: any): this {
        Object.assign(this, input);
        this.id = `project:${(input && input._id) ? input._id : uuid()}`;
        this.start = input ? new Date(input.start) : new Date();
        this.end = input ? new Date(input.end) : new Date();
        this.entities = [];
        this.logicalFrames = [];
        this.extraIndicators = ( input && input.extraIndicators ) ? input.extraIndicators.map(x => new ExtraIndicator(x)) : [];
        this.forms = ( input && input.forms ) ? input.forms.map(x => new Form(x)) : [];
        return this;
    }

    serialize() {
        return null;
    }
}
