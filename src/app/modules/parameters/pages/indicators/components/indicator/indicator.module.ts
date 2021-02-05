import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndicatorComponent } from './indicator.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { MatDialogModule } from '@angular/material/dialog';
import { IndicatorModalModule } from '../indicator-modal/indicator-modal.module';
import { IndicatorAlertModule } from '../indicator-alert/indicator-alert.module';

@NgModule({
  declarations: [IndicatorComponent],
  imports: [
    CommonModule,
    TranslateModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatMenuModule,
    MatIconModule,
    RouterModule,
    IndicatorModalModule,
    IndicatorAlertModule
  ],
  exports: [IndicatorComponent]
})
export class IndicatorModule { }
