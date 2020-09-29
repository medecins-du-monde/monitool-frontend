import { Deserializable } from './deserializable.model';

class Patch {
    op: string;
    path: string;
    value?: string;

    constructor(input?: any) {
        Object.assign(this, input);
    }

    get translationKey(): string {
        return 'Patch.Add.Thematic';
    }
}

export class Revision implements Deserializable {
    user: string;
    time: Date;
    backwards: Patch[];
    forwards: Patch[];

    get username(): string {
        return this.user.substring(5);
    }

    constructor(input?: any) {
        this.deserialize(input);
    }

    deserialize(input: any): this {
        Object.assign(this, input);
        this.backwards = input ? input.backwards.map(x => new Patch(x)) : [];
        this.forwards = input ? input.forwards.map(x => new Patch(x)) : [];
        return this;
    }

    serialize() {
        return this;
    }
}
