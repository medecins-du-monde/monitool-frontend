import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportingMenuComponent } from './reporting-menu.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [ReportingMenuComponent],
  imports: [
    CommonModule,
    TranslateModule,
    MatTableModule,
    MatMenuModule,
    MatIconModule,
  ],
  exports: [ReportingMenuComponent]
})
export class ReportingMenuModule { }
