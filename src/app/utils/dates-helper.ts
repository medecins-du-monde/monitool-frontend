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

  // Take 2 string dates and return the biggest on string type. Return null if none of these string is convertible to date.
  static getTheBiggest(date1: string, date2: string): string {
    const parsedDate1 = Date.parse(date1);
    const parsedDate2 = Date.parse(date2);
    if (!parsedDate1 && parsedDate2) {
      return date2;
    }
    else if (!parsedDate2 && parsedDate1) {
      return date1;
    }
    else if (!parsedDate1 && !parsedDate2) {
      return null;
    }
    else {
      return parsedDate1 > parsedDate2 ? date1 : date2;
    }
  }
}

