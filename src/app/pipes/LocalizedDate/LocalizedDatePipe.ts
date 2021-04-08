import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';


@Pipe({
  name: 'localizedDate',
  pure: false
})
export class LocalizedDatePipe implements PipeTransform {
  constructor(private translateService: TranslateService) { }

  transform(value: any, pattern = 'longDate'): any {
    const currentLang = this.translateService.currentLang ? this.translateService.currentLang : this.translateService.defaultLang;
    const datePipe: DatePipe = new DatePipe(currentLang);
    return datePipe.transform(value, pattern);
  }
}
