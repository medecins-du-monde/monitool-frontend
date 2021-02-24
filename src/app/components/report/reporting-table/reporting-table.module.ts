import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportingTableComponent } from './reporting-table.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { ReportingMenuModule } from '../reporting-menu/reporting-menu.module';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [ReportingTableComponent],
  imports: [
    CommonModule,
    TranslateModule,
    MatTableModule,
    MatIconModule,
    ReportingMenuModule,
    MatTooltipModule
  ],
  exports: [ReportingTableComponent]
})
export class ReportingTableModule { }
