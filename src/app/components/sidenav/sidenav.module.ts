import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './sidenav.component';
import { RouterModule } from '@angular/router';
import { SvgIconsModule } from '@ngneat/svg-icon';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    SidenavComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    RouterModule,
    SvgIconsModule
  ],
  exports: [
    SidenavComponent
  ]
})
export class SidenavModule { }
