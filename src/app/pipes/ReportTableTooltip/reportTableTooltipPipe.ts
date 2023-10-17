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
  name: 'getTooltip'
})
export class ReportTableTooltipPipe implements PipeTransform {
  transform(originalTooltip: string, showComments: boolean, comment?: string): string | null {
    let tooltipContent = '';

    if (showComments) {
      if (originalTooltip) {
        tooltipContent += `
          <div style='opacity: .75; font-style: italic; font-size: small; line-height: 1.1em'>
            ${originalTooltip}
          </div>`;
      }
      if (comment) {
        tooltipContent += `${
          tooltipContent ? '<div style="width: 100%; background: white; height: 1px; opacity: .4; margin: 3px 0"></div>' : ''
        }<div style='font-size: small; line-height: 1.1em'>${comment}</div>`;
      }
    } else {
      if (originalTooltip) {
        tooltipContent += `<div style='font-size: small; line-height: 1.1em'>${originalTooltip}</div>`;
      }
    }

    return tooltipContent !== '' ? tooltipContent : null;
  }
}
