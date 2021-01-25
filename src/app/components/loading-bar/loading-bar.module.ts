import { NgModule } from '@angular/core';
import { LoadingBarComponent } from './loading-bar.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [LoadingBarComponent],
  imports: [
    NgxSpinnerModule,
    TranslateModule
  ],
  exports: [LoadingBarComponent]
})
export class LoadingBarModule { }
