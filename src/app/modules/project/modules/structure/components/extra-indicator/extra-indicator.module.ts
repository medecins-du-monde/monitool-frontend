import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExtraIndicatorComponent } from './extra-indicator.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';

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
