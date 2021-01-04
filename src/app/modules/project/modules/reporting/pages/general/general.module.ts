import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { GeneralRoutingModule } from './general-routing.module';
import { GeneralComponent } from './general.component';
import { ReportTableModule } from 'src/app/components/report/report-table/report-table.module';
import { ChartModule} from 'src/app/components/chart/chart.module';
import { ObjectGroupingModule} from './objectGrouping/object-grouping.module';
import { FilterModule} from './filter/filter.module';
import { DataTableModule } from './dataTable/data-table.module';
import { ReportingTableModule } from 'src/app/components/report/reporting-table/reporting-table.module';


@NgModule({
    declarations: [GeneralComponent],
    imports: [
        CommonModule,
        TranslateModule,
        GeneralRoutingModule,
        ReportTableModule,
        ReportingTableModule,
        ChartModule,
        ObjectGroupingModule,
        FilterModule,
        DataTableModule
    ]
})
export class GeneralModule { }
