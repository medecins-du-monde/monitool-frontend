import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressBarTripleComponent } from './progress-bar-triple.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatTooltipModule } from '@angular/material/tooltip';



@NgModule({
  declarations: [ProgressBarTripleComponent],
  imports: [
    CommonModule,
    MatTooltipModule,
    TranslateModule,
  ],
  exports: [ProgressBarTripleComponent]
})
export class ProgressBarTripleModule { }
