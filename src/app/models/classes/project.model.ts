import { Deserializable } from '../interfaces/deserializable.model';
import { v4 as uuid } from 'uuid';
import { Theme } from './theme.model';
import { Form } from './form.model';
import { ProjectIndicator } from './project-indicator.model';
import { Entity } from './entity.model';
import { LogicalFrame } from './logical-frame.model';
import * as _ from 'lodash';
import { Group } from './group.model';
import { User } from './user.model';
import DatesHelper from 'src/app/utils/dates-helper';

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
    groups: Group[] = [];
    forms: Form[] = [];
    users: User[];
    visibility: string;
    parsed?: boolean;

    get status(): string{
        if ( this.active ) {
            return this.end > new Date() ? 'Ongoing' : 'Finished';
        }
        return 'Deleted';
    }

    get countryImage(): string{
        if ( this.country === 'Burkina Faso' ) {
            return 'assets/images/burkina-flag.png';
        } else {
            return 'assets/images/italy-flag.png';
        }
    }

    constructor(input?: any){
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
        this.start = input ? DatesHelper.parseDate(input.start) : new Date();
        this.end = input ? DatesHelper.parseDate(input.end) : new Date(this.setDefaultEnd());
        this.visibility = input ? input.visibility : 'public';
        this.entities = ( input && input.entities ) ? input.entities.map(x => {
            if (!x.start) { x.start = this.start; }
            if (!x.end) { x.end = this.end; }
            return new Entity(x);
        }) : [];
        this.groups = ( input && input.groups ) ? input.groups.map(x => {
            const group = new Group(x);
            group.members = this.entities.filter(e => x.members.indexOf(e.id) >= 0);
            return group;
        }) : [];
        this.extraIndicators = ( input && input.extraIndicators ) ? input.extraIndicators.map(x => new ProjectIndicator(x)) : [];
        this.forms = ( input && input.forms ) ? input.forms.map(x => {
            if (!x.start) { x.start = this.start; }
            if (!x.end) { x.end = this.end; }
            const form = new Form(x);
            form.entities = this.entities.filter(e => x.entities.indexOf(e.id) >= 0);
            return form;
        }) : [];
        this.logicalFrames = ( input && input.logicalFrames ) ? input.logicalFrames.map(x => {
            if (!x.start) { x.start = this.start; }
            if (!x.end) { x.end = this.end; }
            const logicalFrame = new LogicalFrame(x);
            logicalFrame.entities = this.entities.filter(e => x.entities.indexOf(e.id) >= 0);
            return logicalFrame;
        }) : [];
        this.crossCutting = (input && input.crossCutting) ? input.crossCutting : {};
        this.users = (input && input.users) ? input.users.map(u => {
            const user = new User(u);
            if (u.entities){
                user.entities = this.entities.filter(e => u.entities.indexOf(e.id) >= 0);
            }
            if (u.dataSources){
                user.dataSources = this.forms.filter(f => u.dataSources.indexOf(f.id) >= 0);
            }
            return user;
        }) : [];
        return this;
    }

    formatCrossCutting(): any{
      const crossCuttingFormated = {};
      Object.keys(this.crossCutting).map(x => {
        crossCuttingFormated[x] = new ProjectIndicator(this.crossCutting[x]).serialize(true);
      });
      return crossCuttingFormated;
    }

    serialize() {
        const serialized = {
            active: this.active,
            country: this.country,
            crossCutting: this.formatCrossCutting(),
            end: this.end ? DatesHelper.dateToString(this.end) : null,
            entities: this.entities.map(x => x.serialize()),
            extraIndicators: this.extraIndicators.map(x => x.serialize()),
            forms: this.forms.map(x => x.serialize()),
            logicalFrames: this.logicalFrames.map(x => x.serialize()),
            groups: this.groups.map(x => x.serialize()),
            name: this.name,
            start: this.start ? DatesHelper.dateToString(this.start) : null,
            themes: this.themes.map(x => x.id),
            type: this.type,
            users: this.users.map(x => x.serialize()),
            visibility: this.visibility,
            _id: this.id
        };
        Object.assign(serialized, this.rev ? {_rev: this.rev } : null );
        return serialized;
    }

    copy(): Project {
        return _.cloneDeep(this);
    }

    equals(project: Project): boolean {
        const a = new Project();
        const b = new Project();
        if (this){
            Object.assign(a, this);
        }
        if (project){
            Object.assign(b, project);
        }

        // the 'parsed' property shouldn't interfere in the check if two projects are equal
        // so we can remove it for the test
        if (a && 'parsed' in a){
            delete a.parsed;
        }
        if (b && 'parsed' in b){
            delete b.parsed;
        }

        return _.isEqual(a, b);
    }
}
