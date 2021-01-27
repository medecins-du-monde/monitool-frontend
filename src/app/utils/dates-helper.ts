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

  static parseDate(date: string | Date): Date {

    // converts a string in the format YYYY-mm-dd to Date
    // this format is used for every date in the database
    if (typeof date === 'string'){
      const dateArgs = date.split('-');
      return new Date(+dateArgs[0], (+dateArgs[1]) - 1, +dateArgs[2]);
    }

    // if the argument is already a Date, we don't need to convert anything
    if (date instanceof Date){
      return new Date(date);
    }
  }

}

