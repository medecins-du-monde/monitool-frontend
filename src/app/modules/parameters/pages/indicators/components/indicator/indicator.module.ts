import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndicatorComponent } from './indicator.component';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { RouterModule } from '@angular/router';
import { MatLegacyMenuModule as MatMenuModule } from '@angular/material/legacy-menu';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { IndicatorModalModule } from '../indicator-modal/indicator-modal.module';

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
    IndicatorModalModule
  ],
  exports: [IndicatorComponent]
})
export class IndicatorModule { }
