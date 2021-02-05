// tslint:disable: no-string-literal
import { Deserializable } from '../interfaces/deserializable.model';
import { Entity } from './entity.model';
import { Form } from './form.model';

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
    projectId?: string;

    get login() {
        return this.id.split(':')[1];
    }

    get roleDisplay() {
        return this.role.charAt(0).toUpperCase() + this.role.slice(1) + 'Role';
    }

    get email() {
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
      return this;
    }

    serialize() {
        const user = {
            type: this.type,
            role: this.role,
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
        return user;
    }
}
