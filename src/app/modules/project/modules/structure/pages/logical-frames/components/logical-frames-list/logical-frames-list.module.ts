import { DragDropModule } from '@angular/cdk/drag-drop';
import { CdkTableModule } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { LogicalFrameModule } from '../logical-frame/logical-frame.module';
import { LogicalFramesListComponent } from './logical-frames-list.component';

@NgModule({
  declarations: [LogicalFramesListComponent],
  imports: [
    CommonModule,
    TranslateModule,
    LogicalFrameModule,
    MatButtonModule,
    MatIconModule,
    DragDropModule,
    CdkTableModule
  ],
  exports: [LogicalFramesListComponent]
})
export class LogicalFramesListModule { }
