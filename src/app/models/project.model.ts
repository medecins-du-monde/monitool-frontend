import { Deserializable } from './deserializable.model';
import { v4 as uuid } from 'uuid';
import { Theme } from './theme.model';
import { Form } from './form.model';
import { ProjectIndicator } from './project-indicator.model';
import { Entity } from './entity.model';
import { LogicalFrame } from './logical-frame.model';
import * as _ from 'lodash';
import { Group } from './group.model';
import { User } from './user.model';

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

    get status(): string{
        if ( this.active ) {
            return this.end > new Date() ? 'Ongoing' : 'Finished';
        }
        return 'Deleted';
    }

    get percentages(): unknown{
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
        this.start = input ? new Date(input.start) : new Date();
        this.end = input ? new Date(input.end) : new Date(this.setDefaultEnd());
        this.visibility = input ? input.visibility : 'public';
        this.entities = ( input && input.entities ) ? input.entities.map(x => new Entity(x)) : [];
        this.groups = ( input && input.groups ) ? input.groups.map(x => {
            const group = new Group(x);
            group.members = this.entities.filter(e => x.members.indexOf(e.id) >= 0);
            return group;
        }) : [];
        // this.users = ( input && input.users ) ? input.users.map(x => new User(x)) : [];
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
            end: this.end ? this.end.toISOString().slice(0, 10) : null,
            entities: this.entities.map(x => x.serialize()),
            extraIndicators: this.extraIndicators.map(x => x.serialize()),
            forms: this.forms.map(x => x.serialize()),
            logicalFrames: this.logicalFrames.map(x => x.serialize()),
            groups: this.groups.map(x => x.serialize()),
            name: this.name,
            start: this.start ? this.start.toISOString().slice(0, 10) : null,
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
        // const obj = this.serialize();
        // const themes = this.themes;
        // const project = new Project(obj);
        // project.themes = themes;
        // return project;
        // return new Project(JSON.parse(JSON.stringify(this)));
    }

    equals(project: Project): boolean {
        return JSON.stringify(this) === JSON.stringify(project);
    }
}
