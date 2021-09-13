import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeComponent } from './theme.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MatDialogModule } from '@angular/material/dialog';
import { ThemeModalModule } from '../theme-modal/theme-modal.module';
import { ConfirmModalModule } from 'src/app/components/confirm-modal/confirm-modal.module';

@NgModule({
  declarations: [ThemeComponent],
  imports: [
    CommonModule,
    TranslateModule,
    MatCardModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    RouterModule,
    MatDialogModule,
    ThemeModalModule,
    ConfirmModalModule
  ],
  exports: [ThemeComponent]
})
export class ThemeModule { }
