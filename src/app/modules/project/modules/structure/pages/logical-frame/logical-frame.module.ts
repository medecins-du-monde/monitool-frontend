import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { LogicalFrameRoutingModule } from './logical-frame-routing.module';
import { LogicalFrameComponent } from './logical-frame.component';

@NgModule({
    declarations: [LogicalFrameComponent],
    imports: [
        CommonModule,
        TranslateModule,
        LogicalFrameRoutingModule
    ]
})
export class LogicalFrameModule { }
