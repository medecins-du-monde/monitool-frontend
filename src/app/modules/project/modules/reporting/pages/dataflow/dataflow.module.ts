import { NgModule } from '@angular/core';
import { DataflowComponent } from './dataflow.component';
import { CommonModule } from '@angular/common';
import { DataflowRoutingModule } from './dataflow-routing.module';
import { NgxGraphModule } from '@swimlane/ngx-graph';
import { DataFlowStylePipeModule } from 'src/app/pipes/DataFlowStyle/data-flow-style.pipe.module';
import { TranslateModule } from '@ngx-translate/core';
import { DataFlowEllipsisPipeModule } from 'src/app/pipes/DataFlowEllipsis/data-flow-ellipsis.pipe.module';


@NgModule({
    declarations: [DataflowComponent],
    imports: [
        CommonModule,
        DataflowRoutingModule,
        NgxGraphModule,
        DataFlowStylePipeModule,
        DataFlowEllipsisPipeModule,
        TranslateModule
    ]
})
export class DataflowModule { }
