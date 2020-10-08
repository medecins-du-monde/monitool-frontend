import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { LogicalFrameEditModule } from './components/logical-frame-edit/logical-frame-edit.module';
import { LogicalFrameModule } from './components/logical-frame/logical-frame.module';
import { LogicalFramesRoutingModule } from './logical-frames-routing.module';
import { LogicalFramesComponent } from './logical-frames.component';

@NgModule({
    declarations: [LogicalFramesComponent],
    imports: [
        CommonModule,
        TranslateModule,
        LogicalFramesRoutingModule,
        LogicalFrameModule,
        LogicalFrameEditModule,
        MatButtonModule,
        MatIconModule
    ]
})
export class LogicalFramesModule { }
