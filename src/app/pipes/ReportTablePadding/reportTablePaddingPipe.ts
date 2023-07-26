import { Pipe, PipeTransform } from '@angular/core';


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
  name: 'calcPadding'
})
export class ReportTablePaddingPipe implements PipeTransform {
  transform(element: any): string {
    if (element.level) {
      return `padding-left: ${element.level * 20}px;`;
    }
    return '';
  }
}
