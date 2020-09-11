import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrossCuttingIndicatorComponent } from './cross-cutting-indicator.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [CrossCuttingIndicatorComponent],
  imports: [
    CommonModule,
    TranslateModule,
    MatCardModule,
    MatButtonModule,
    RouterModule,
    MatIconModule,
  ],
  exports: [CrossCuttingIndicatorComponent]
})
export class CrossCuttingIndicatorModule { }
