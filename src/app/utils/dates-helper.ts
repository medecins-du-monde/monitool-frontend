import { FormGroup, ValidatorFn, AbstractControl } from '@angular/forms';
import moment from 'moment';

export default class DatesHelper {

  static areEquals(date1: Date, date2: Date ): boolean {
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

  static dateIsAfterControlValueValidator(controlName: string, formGroup: FormGroup): ValidatorFn {
    return (control: AbstractControl) => {
      if (!formGroup) {
        return null;
      }
      const value: Date = formGroup.get(controlName).value ? new Date(formGroup.get(controlName).value) : null;
      console.log('first', value);
      console.log('then', new Date(control.value));
      if (!value || !control.value || value.getTime() < new Date(control.value).getTime()) {
        return null;
      }

      return { dateAfter: true };
    };
  }

  // TODO: Create a custom validation helper for that
  static validDates(startDate: Date, endDate: Date): boolean {
    startDate = new Date(startDate);
    endDate = new Date(endDate);
    return startDate.getTime() < endDate.getTime();
  }

  static parseDate(date: string | Date): Date {
    // converts a string in the format YYYY-mm-dd to Date
    // this format is used for every date in the database
    if (typeof date === 'string'){
      const dateArgs = date.split('-');
      return new Date(+dateArgs[0], (+dateArgs[1]) - 1, +dateArgs[2]);
    }
    // if the argument is already a Date, we don't need to convert anything
    else {
      return date;
    }
  }

  static dateToString(date: Date): string{

    // If it s a moment type, we have to re create the date in order to have the method getTime after.
    if (date instanceof moment ) {
      date = new Date(date.toString());
    }

    let time = date.getTime();
    time = time - date.getTimezoneOffset() * 60000;
    const dateWithoutTimezone = new Date(time);
    return dateWithoutTimezone.toISOString().slice(0, 10);
  }
}

