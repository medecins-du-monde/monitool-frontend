import { DragDropModule } from '@angular/cdk/drag-drop';
import { CdkTableModule } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { LogicalFrameModule } from '../logical-frame/logical-frame.module';
import { MatLegacyMenuModule as MatMenuModule } from '@angular/material/legacy-menu';
import { IndicatorListComponent } from './indicator-list.component';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatLegacyChipsModule as MatChipsModule } from '@angular/material/legacy-chips';

@NgModule({
  declarations: [IndicatorListComponent],
  imports: [
    CommonModule,
    TranslateModule,
    LogicalFrameModule,
    MatButtonModule,
    MatIconModule,
    DragDropModule,
    CdkTableModule,
    MatMenuModule,
    MatTooltipModule,
    MatExpansionModule,
    MatChipsModule
  ],
  exports: [IndicatorListComponent]
})
export class IndicatorListModule { }
