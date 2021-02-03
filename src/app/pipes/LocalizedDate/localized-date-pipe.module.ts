import { NgModule } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeEn from '@angular/common/locales/en';
import localeFr from '@angular/common/locales/fr';
import localeEs from '@angular/common/locales/es';
import { LocalizedDatePipe } from 'src/app/pipes/LocalizedDate/LocalizedDatePipe';

@NgModule({
  declarations: [LocalizedDatePipe],
  imports: [],
  exports: [LocalizedDatePipe]
})
export class LocalizedDatePipeModule {
    constructor() {
        registerLocaleData(localeEn, 'en');
        registerLocaleData(localeEs, 'es', );
        registerLocaleData(localeFr, 'fr');
      }
}
