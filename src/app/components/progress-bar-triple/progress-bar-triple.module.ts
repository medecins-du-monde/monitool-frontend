import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressBarTripleComponent } from './progress-bar-triple.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';

@NgModule({
  declarations: [ProgressBarTripleComponent],
  imports: [
    CommonModule,
    TranslateModule,
    MatTooltipModule
  ],
  exports: [ProgressBarTripleComponent]
})
export class ProgressBarTripleModule { }
