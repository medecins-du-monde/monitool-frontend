import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExtraIndicatorComponent } from './extra-indicator.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatLegacyMenuModule as MatMenuModule } from '@angular/material/legacy-menu';

@NgModule({
  declarations: [ExtraIndicatorComponent],
  imports: [
    CommonModule,
    TranslateModule,
    MatCardModule,
    MatButtonModule,
    MatMenuModule,
    RouterModule,
    MatIconModule,
  ],
  exports: [ExtraIndicatorComponent]
})
export class ExtraIndicatorModule { }
