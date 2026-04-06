import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component';

import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ChartModule } from 'src/app/components/chart/chart.module';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';
import { ProjectSaveModule } from '../../../structure/components/project-save/project-save.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommentModalModule } from './comment-modal/comment-modal.module';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    TranslateModule,
    DashboardRoutingModule,
    ChartModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    ProjectSaveModule,
    DragDropModule,
    CommentModalModule,
    MatExpansionModule
  ]
})
export class DashboardModule { }
