import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { GeneralRoutingModule } from './general-routing.module';
import { GeneralComponent } from './general.component';
import { ReportTableModule } from 'src/app/components/report-table/report-table.module';

@NgModule({
    declarations: [GeneralComponent],
    imports: [
        CommonModule,
        TranslateModule,
        GeneralRoutingModule,
        ReportTableModule
    ]
})
export class GeneralModule { }
