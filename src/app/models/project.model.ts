import { Deserializable } from './deserializable.model';
import { v4 as uuid } from 'uuid';
import { Theme } from './theme.model';
import { Form } from './form.model';
import { ExtraIndicator } from './extra-indicator.model';

export class Project implements Deserializable {
    id: string;
    rev: string;
    type = 'project';
    name: string;
    active: boolean;
    start: Date;
    end: Date;
    inputDate: Date;
    country: string;
    themes: Theme[] = [];
    crossCutting: any;
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

    private setDefaultEnd() {
        return new Date().setFullYear(new Date().getFullYear() + 1);
    }

    deserialize(input: any): this {
        Object.assign(this, input);
        this.id = (input && input._id) ? input._id : `project:${uuid()}`;
        this.rev = (input && input._rev) ? input._rev : null;
        this.name = input ? input.name : null;
        this.active = input ? input.active : true;
        this.start = input ? new Date(input.start) : new Date();
        this.end = input ? new Date(input.end) : new Date(this.setDefaultEnd());
        this.visibility = input ? input.visibility : 'public';
        this.entities = [];
        this.logicalFrames = [];
        this.extraIndicators = ( input && input.extraIndicators ) ? input.extraIndicators.map(x => new ExtraIndicator(x)) : [];
        this.forms = ( input && input.forms ) ? input.forms.map(x => new Form(x)) : [];
        this.crossCutting = {};
        this.crossCutting['indicator:fe1635fc-b381-4cfe-9353-177fce63cd50'] = {
            baseline: 12,
            colorize: true,
            computation: {formula: '12', parameters: {}},
            display: 'test',
            target: 100
        };
        this.crossCutting['indicator:09a7d8cd-441d-478a-b750-19fd8bd5faef'] = {
            baseline: null,
            colorize: true,
            computation: null,
            display: 'test 2',
            target: null
        };
        return this;
    }

    serialize() {
        return {
            active: this.active,
            country: this.country,
            crossCutting: {},
            end: this.end.toISOString().slice(0, 10),
            entities: [],
            extraIndicators: [],
            forms: [],
            groups: [],
            logicalFrames: [],
            name: this.name,
            start: this.start.toISOString().slice(0, 10),
            themes: this.themes.map(x => x.id),
            type: this.type,
            users: [],
            visibility: this.visibility,
            _id: this.id,
            _rev: this.rev
        };
    }

    copy(): Project {
        return new Project(JSON.parse(JSON.stringify(this)));
    }

    equals(project: Project): boolean {
        return JSON.stringify(this) === JSON.stringify(project);
    }
}
