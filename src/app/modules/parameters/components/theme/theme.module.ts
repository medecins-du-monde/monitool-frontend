import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeComponent } from './theme.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ThemeComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    RouterModule
  ],
  exports: [ThemeComponent]
})
export class ThemeModule { }
