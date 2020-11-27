import { Deserializable } from './deserializable.model';
import { Entity } from './entity.model';
import { Form } from './form.model';

export class User implements Deserializable {
    id: string;
    type: string;
    role: string;
    name: string;
    username: string;
    password: string;
    entities: Entity[];
    dataSources: Form[];

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
      // tslint:disable-next-line: no-string-literal
      this.id = (input && input['_id']) ? input['_id'] : this.id;
        // this.id = `user:${(input && input._id) ? input._id : uuid()}`;
      return this;
    }

    serialize() {
        const user = {
            type: this.type,
            role: this.role
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
