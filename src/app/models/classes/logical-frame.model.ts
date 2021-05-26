import { Deserializable } from '../interfaces/deserializable.model';
import { ProjectIndicator } from './project-indicator.model';
import { v4 as uuid } from 'uuid';
import { Entity } from './entity.model';
import { Purpose } from './purpose.model';
import DatesHelper from 'src/app/utils/dates-helper';
import _ from 'lodash';

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
      this.deserialize(input);
    }

    deserialize(input: any): this {
        Object.assign(this, input);
        this.id = (input && input.id) ? input.id : uuid();
        this.purposes = ( input && input.purposes ) ? input.purposes.map(x => new Purpose(x)) : [];
        this.start = ( input && input.start ) ? DatesHelper.parseDate(input.start)  : null;
        this.end = ( input && input.end ) ? DatesHelper.parseDate(input.end) : null;
        this.indicators = ( input && input.indicators ) ? input.indicators.map(x => new ProjectIndicator(x)) : [];
        return this;
    }

    serialize() {
      return {
            id: this.id,
            name: this.name,
            goal: this.goal,
            start: this.start ? DatesHelper.dateToString(this.start) : null,
            end: this.end ? DatesHelper.dateToString(this.end) : null,
            entities: this.entities.map(x => x.id),
            purposes: this.purposes.map(x => x.serialize()),
            indicators: this.indicators.map(x => x.serialize()),
        };
    }

  equals(other: LogicalFrame): boolean{
    return _.isEqual(this, other);
  }
}
