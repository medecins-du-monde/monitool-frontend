import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportTableComponent } from './report-table.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [ReportTableComponent],
  imports: [
    CommonModule,
    TranslateModule,
    MatTableModule,
    MatIconModule,
  ],
  exports: [ReportTableComponent]
})
export class ReportTableModule { }
