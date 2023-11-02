import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';


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
  constructor(private translateService: TranslateService) { }

  transform(originalTooltip: string, showComments: boolean, comment?: { value: string; cellValue?: string }, cellValue?: any): string | null {
    let tooltipContent = '';

    if (showComments) {
      if (originalTooltip) {
        tooltipContent += `
          <div style='opacity: .75; font-style: italic; font-size: small; line-height: 1.1em'>
            ${originalTooltip}
          </div>`;
      }
      if (comment) {
        const formattedCellValue: string = typeof cellValue === 'number' ? cellValue.toString() : (cellValue || '');
        const valueChanged = comment.cellValue ? comment.cellValue !== formattedCellValue : false;

        tooltipContent += `${
          tooltipContent ? '<div style="width: 100%; background: white; height: 1px; opacity: .4; margin: 3px 0"></div>' : ''
        }<div style='font-size: small; line-height: 1.1em;'>${comment.value}</div>`;

        if (valueChanged) {
          tooltipContent +=
          `<div style='border: solid 1px rgb(255, 255, 128); color: rgb(255, 255, 128); opacity: .75; border-radius: 4px; margin-top: 4px;
          padding: 2px 6px; font-size: small; line-height: 1.1em; overflow-wrap: break-word;'>
            ${this.translateService.instant('comment-warning')}
          </div>`;
        }
      }
    } else {
      if (originalTooltip) {
        tooltipContent += `<div style='font-size: small; line-height: 1.1em'>${originalTooltip}</div>`;
      }
    }

    return tooltipContent !== '' ? tooltipContent : null;
  }
}
