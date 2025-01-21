import { Pipe, PipeTransform } from '@angular/core';
import { InfoRow } from 'src/app/models/interfaces/report/rows/info-row.model';


/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 | exponentialStrength:10 }}
 *   formats to: 1024
*/
@Pipe({
  name: 'calcColor'
})
export class ReportTableColorPipe implements PipeTransform {
  transform(element: InfoRow, column: string): string {
    // the colors change in the following way:
    // we start in the red: rgb(255, 128, 128)
    // we go up increasing the value of the blue
    // until we reach the yellow: rgb (255, 255, 128)
    // after this we go down subtracting the value
    // of the red until we get to the green: rgb (128, 255, 128)

    // if (this.checkIfNaN(element.values[column])) {
    //   return 'rgb(238, 238, 238)';
    // }

    if (
      element.values[column] === null ||
      isNaN(Number(element.values[column]))
    ) {
      return 'white';
    }

    // Set background color to white if the row doesn't want colors
    if (
      !element.colorize ||
      element.target === null ||
      element.baseline === null
    ) {
      return 'white';
    }

    let r = 255;
    let g = 128;
    const b = 128;

    if (element.baseline <= element.target) {
      const distance = element.target - element.baseline;

      // if the value is lower than the baseline, we choose red
      if (element.values[column] <= element.baseline) {
        r = 255;
        g = 128;
      }
      // if it is higher than the target, we choose green
      else if (element.values[column] >= element.target) {
        g = 255;
        r = 128;
      }
      // if it is somewhere in between, we calculate where and choose accordingly
      else {
        const myPosition = element.values[column] - element.baseline;
        const normalizedDifference = (myPosition / distance) * 255;
        if (normalizedDifference <= 127) {
          g += normalizedDifference;
        } else {
          g = 255;
          r -= normalizedDifference - 127;
        }
      }
    } else {
      // If baseline is a higher value that the target we invert the calculations
      const distance = element.baseline - element.target;

      // if the value is higher than the baseline, we choose red
      if (element.values[column] >= element.baseline) {
        r = 255;
        g = 128;
      }
      // if it is lower than the target, we choose green
      else if (element.values[column] <= element.target) {
        g = 255;
        r = 128;
      }
      // if it is somewhere in between, we calculate where and choose accordingly
      else {
        const myPosition = element.baseline - element.values[column];
        const normalizedDifference = (myPosition / distance) * 255;
        if (normalizedDifference <= 127) {
          g += normalizedDifference;
        } else {
          g = 255;
          r -= normalizedDifference - 127;
        }
      }
    }

    return `rgb(${r}, ${g}, ${b})`;
  }

  checkIfNaN(x: any): boolean {
    return isNaN(x);
  }

}
