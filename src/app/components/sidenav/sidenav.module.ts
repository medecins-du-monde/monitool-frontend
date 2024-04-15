import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './sidenav.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    SidenavComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    RouterModule,
    MatIconModule,
    MatTooltipModule
  ],
  exports: [
    SidenavComponent
  ]
})
export class SidenavModule { }
