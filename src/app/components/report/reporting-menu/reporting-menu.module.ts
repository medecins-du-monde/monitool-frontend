import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportingMenuComponent } from './reporting-menu.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyMenuModule as MatMenuModule } from '@angular/material/legacy-menu';

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
