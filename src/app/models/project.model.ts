import { Deserializable } from './deserializable.model';
import { v4 as uuid } from 'uuid';
import { Theme } from './theme.model';
import { Form } from './form.model';
import { ProjectIndicator } from './project-indicator.model';
import { Entity } from './entity.model';
import { LogicalFrame } from './logical-frame.model';

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
    extraIndicators: ProjectIndicator[] = [];
    logicalFrames: LogicalFrame[] = [];
    entities: Entity[] = [];
    groups: any[];
    forms: Form[] = [];
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
        this.entities = ( input && input.entities ) ? input.entities.map(x => new Entity(x)) : [];
        this.extraIndicators = ( input && input.extraIndicators ) ? input.extraIndicators.map(x => new ProjectIndicator(x)) : [];
        this.forms = ( input && input.forms ) ? input.forms.map(x => {
            const form = new Form(x);
            form.entities = this.entities.filter(e => x.entities.indexOf(e.id) >= 0);
            return form;
        }) : [];
        this.logicalFrames = ( input && input.logicalFrames ) ? input.logicalFrames.map(x => {
            const logicalFrame = new LogicalFrame(x);
            logicalFrame.entities = this.entities.filter(e => x.entities.indexOf(e.id) >= 0);
            return logicalFrame;
        }) : [];
        this.crossCutting = {};
        this.crossCutting['indicator:5c72fa08-f0ec-4e80-8e9a-5d32566a0dc5'] = {
            baseline: 12,
            colorize: true,
            computation: {formula: '12', parameters: {}},
            display: 'test',
            target: 100
        };
        this.crossCutting['indicator:7d4599d1-7a54-425c-a8e9-4d1bc594b82b'] = {
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
            end: this.end ? this.end.toISOString().slice(0, 10) : null,
            entities: this.entities.map(x => x.serialize()),
            extraIndicators: [],
            forms: this.forms.map(x => x.serialize()),
            groups: [],
            logicalFrames: [],
            name: this.name,
            start: this.start ? this.start.toISOString().slice(0, 10) : null,
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
