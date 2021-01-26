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

  // converts a string in the format YYYY-mm-dd to Date
  // this format is used for every date in the database
  static parseDate(dateString: string): Date {
    const dateArgs = dateString.split('-');
    return new Date(+dateArgs[0], (+dateArgs[1]) - 1, +dateArgs[2]);
  }

}

