import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './sidenav.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    SidenavComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    RouterModule,
    MatIconModule
  ],
  exports: [
    SidenavComponent
  ]
})
export class SidenavModule { }
