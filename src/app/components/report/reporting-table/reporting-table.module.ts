import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportingTableComponent } from './reporting-table.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { ReportingMenuModule } from '../reporting-menu/reporting-menu.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { CommentModalModule } from '../comment-modal/comment-modal.module';
import { ProjectSaveModule } from 'src/app/modules/project/modules/structure/components/project-save/project-save.module';

@NgModule({
  declarations: [ReportingTableComponent],
  imports: [
    CommonModule,
    TranslateModule,
    MatTableModule,
    MatIconModule,
    ReportingMenuModule,
    MatTooltipModule,
    MatMenuModule,
    CommentModalModule,
    ProjectSaveModule
  ],
  exports: [ReportingTableComponent]
})
export class ReportingTableModule { }
