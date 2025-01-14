import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportingTableComponent } from './reporting-table.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { MatIconModule } from '@angular/material/icon';
import { ReportingMenuModule } from '../reporting-menu/reporting-menu.module';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';
import { MatLegacyMenuModule as MatMenuModule } from '@angular/material/legacy-menu';
import { CommentModalModule } from '../comment-modal/comment-modal.module';
import { ProjectSaveModule } from 'src/app/modules/project/modules/structure/components/project-save/project-save.module';
import { ReportTableTooltipPipeModule } from 'src/app/pipes/ReportTableTooltip/reportTableTooltipPipe.module';
import { ReportTablePaddingPipeModule } from 'src/app/pipes/ReportTablePadding/reportTablePaddingPipe.module';
import { ReportTableColorPipeModule } from 'src/app/pipes/ReportTableColor/reportTableColorPipe.module';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { DetailsModalModule } from '../details-modal/details-modal.module';

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
    DetailsModalModule,
    ProjectSaveModule,
    ReportTableTooltipPipeModule,
    ReportTablePaddingPipeModule,
    ReportTableColorPipeModule,
    MatDialogModule
  ],
  exports: [ReportingTableComponent]
})
export class ReportingTableModule { }
