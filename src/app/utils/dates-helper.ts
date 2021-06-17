import { FormGroup, ValidatorFn } from '@angular/forms';
import moment from 'moment';

export default class DatesHelper {

  static areEquals(date1: Date, date2: Date): boolean {
    // TODO: Convert moment to date in case there is.
    // If it s a moment type, we have to re create the date in order to have the method getTime after.
    if (date1 instanceof moment) {
      date1 = new Date(date1.toString());
    }
    if (date2 instanceof moment) {
      date2 = new Date(date2.toString());
    }

    if (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    ) {
      return true;
    }
    else {
      return false;
    }
  }

  static orderedDates(before: string, after: string): ValidatorFn {
    return (group: FormGroup) => {
      const beforeValue: Date = group.get(before).value ? new Date(group.get(before).value) : null;
      const afterValue: Date = group.get(after).value ? new Date(group.get(after).value) : null;

      if (!beforeValue || !afterValue || beforeValue.getTime() < afterValue.getTime()) {
        return null;
      }
      return { wrongDates: true };
    };
  }

  static parseDate(date: string | Date): Date {
    // converts a string in the format YYYY-mm-dd to Date
    // this format is used for every date in the database
    if (typeof date === 'string') {
      const dateArgs = date.split('-');
      return new Date(+dateArgs[0], (+dateArgs[1]) - 1, +dateArgs[2]);
    }
    // if the argument is already a Date, we don't need to convert anything
    else {
      return date;
    }
  }

  static dateToString(date: Date): string {

    // If it s a moment type, we have to re create the date in order to have the method getTime after.
    if (date instanceof moment) {
      date = new Date(date.toString());
    }

    let time = date.getTime();
    time = time - date.getTimezoneOffset() * 60000;
    const dateWithoutTimezone = new Date(time);
    return dateWithoutTimezone.toISOString().slice(0, 10);
  }
}

