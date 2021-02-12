import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { LogicalFrameEditModule } from './components/logical-frame-edit/logical-frame-edit.module';
import { LogicalFramesListModule } from './components/logical-frames-list/logical-frames-list.module';
import { LogicalFramesRoutingModule } from './logical-frames-routing.module';
import { LogicalFramesComponent } from './logical-frames.component';

@NgModule({
  declarations: [LogicalFramesComponent],
  imports: [
    CommonModule,
    TranslateModule,
    LogicalFramesRoutingModule,
    LogicalFramesListModule,
    LogicalFrameEditModule,
  ]
})
export class LogicalFramesModule { }
