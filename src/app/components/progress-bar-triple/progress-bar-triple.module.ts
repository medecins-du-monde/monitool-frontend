import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressBarTripleComponent } from './progress-bar-triple.component';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [ProgressBarTripleComponent],
  imports: [
    CommonModule,
    TranslateModule,
  ],
  exports: [ProgressBarTripleComponent]
})
export class ProgressBarTripleModule { }
