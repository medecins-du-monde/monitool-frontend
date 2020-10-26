import { Deserializable } from './deserializable.model';
import { ProjectIndicator } from './project-indicator.model';
import { v4 as uuid } from 'uuid';
import { Entity } from './entity.model';
import { Purpose } from './purpose.model';

export class LogicalFrame implements Deserializable {
    id: string;
    name: string;
    goal = '';
    start: Date;
    end: Date;
    entities: Entity[] = [];
    indicators: ProjectIndicator[] = [];
    purposes: Purpose[] = [];

    constructor(input?: any) {
      console.log('Here is the input :');
      console.log(input);
      this.deserialize(input);
    }

    deserialize(input: any): this {
        Object.assign(this, input);
        this.id = (input && input.id) ? input.id : uuid();
        this.purposes = ( input && input.purposes ) ? input.purposes.map(x => new Purpose(x)) : [];
        this.start = ( input && input.start ) ? new Date(input.start)  : null;
        this.end = ( input && input.end ) ? new Date(input.end) : null;
        this.indicators = ( input && input.indicators ) ? input.indicators.map(x => new ProjectIndicator(x)) : [];
        return this;
    }

    serialize() {
      console.log('here are the indicators : ');
      console.log(this.indicators);
      console.log('Here is the type of indicators : ')
      console.log(typeof this.indicators[0])
      console.log('and now a list of indicators')
      return {
            id: this.id,
            name: this.name,
            goal: this.goal,
            start: this.start ? this.start.toISOString().slice(0, 10) : null,
            end: this.end ? this.end.toISOString().slice(0, 10) : null,
            entities: this.entities.map(x => x.id),
            purposes: this.purposes.map(x => x.serialize()),
            indicators: this.indicators.map(x => x.serialize()),
        };
    }
}
