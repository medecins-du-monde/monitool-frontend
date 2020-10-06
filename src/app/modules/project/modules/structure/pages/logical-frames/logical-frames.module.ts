import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
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
        MatButtonModule,
        MatIconModule
    ]
})
export class LogicalFramesModule { }
