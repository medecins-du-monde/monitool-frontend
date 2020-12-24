import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportingMenuComponent } from './reporting-menu.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [ReportingMenuComponent],
  imports: [
    CommonModule,
    TranslateModule,
    MatTableModule,
    MatIconModule,
  ],
  exports: [ReportingMenuComponent]
})
export class ReportingMenuModule { }
