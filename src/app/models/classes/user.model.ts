/* eslint-disable @typescript-eslint/dot-notation */
import { Deserializable } from '../interfaces/deserializable.model';
import { Entity } from './entity.model';
import { Form } from './form.model';
import { LogicalFrame } from './logical-frame.model';

export class User implements Deserializable {
    id: string;
    type: string;
    rev: string;
    role: string;
    name: string;
    username: string;
    password: string;
    entities: Entity[];
    dataSources: Form[];
    logicalFrames: LogicalFrame[];
    // Read-only users limited to some logical frames and/or data sources (general report display only).
    restricted = false;
    projectId?: string;
    active: boolean;
    favoriteProjects: string[] = [];

    get login(): string {
        return this.id.split(':')[1];
    }

    get roleDisplay(): string {
        return this.role.charAt(0).toUpperCase() + this.role.slice(1) + 'Role';
    }

    get email(): string {
        return `${this.login}@medecinsdumonde.net`;
    }

    constructor(input?: any) {
        this.deserialize(input);
    }

    deserialize(input: any): this {
      Object.assign(this, input);

      this.id = (input && input['_id']) ? input._id : this.id;
      this.role = ( input && input.role ) ? input.role : null;
      this.name = ( input && input.name ) ? input.name : null;
      this.type = ( input && input.type ) ? input.type : null;
      this.rev = ( input && input['_rev']) ? input._rev : null;
      this.favoriteProjects = (input && input.favoriteProjects) ? input.favoriteProjects : [];
      // Explicit flag from the edit form, otherwise restricted when the stored lists are present.
      this.restricted = !!(input && input.role === 'read'
        && (input.restricted !== undefined ? input.restricted : (input.logicalFrames || input.dataSources)));
      return this;
    }

    serialize() {
        const user = {
            type: this.type,
            role: this.role,
            active: this.active,
        };

        if (this.type === 'internal'){
            if (this.id){
                Object.assign(user, {
                    id: this.id,
                });
            }
        }
        else if (this.type === 'partner'){
            Object.assign(user, {
                username: this.username,
                name: this.name,
                password: this.password
            });
        }
        else if (this.type === 'user')
        {
            Object.assign(user, {
                name: this.name,
                role: this.role,
                type: this.type,
                _id: this.id,
                _rev: this.rev
            });
        }

        if (this.role === 'input'){
            if (this.entities){
                Object.assign(user, {
                    entities: this.entities.map(x => x.id)
                });
            }
            if (this.dataSources){
                Object.assign(user, {
                    dataSources: this.dataSources.map(x => x.id)
                });
            }
        }
        else if (this.role === 'read' && this.restricted){
            Object.assign(user, {
                logicalFrames: (this.logicalFrames || []).map(x => x.id),
                dataSources: (this.dataSources || []).map(x => x.id)
            });
        }
        return user;
    }
}
