import { ObjectGroupingModule } from './../../modules/project/modules/reporting/pages/general/objectGrouping/object-grouping.module';
import { ReportingTableModule } from 'src/app/components/reporting-table/reporting-table.module';
import { DataTableModule } from './../../modules/project/modules/reporting/pages/general/dataTable/data-table.module';
import { FilterModule } from './../../modules/project/modules/reporting/pages/general/filter/filter.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IndicatorModule } from 'src/app/components/indicator/indicator.module';
import { IndicatorsRoutingModule } from './indicators-routing.module';
import { IndicatorsComponent } from './indicators.component';
import { IndicatorReportComponent } from './components/indicator-report/indicator-report.component';
import { ChartModule} from 'src/app/components/shared/chart/chart.module';

@NgModule({
    declarations: [IndicatorsComponent, IndicatorReportComponent],
    imports: [
        CommonModule,
        TranslateModule,
        IndicatorsRoutingModule,
        IndicatorModule,
        FilterModule,
        DataTableModule,
        ReportingTableModule,
        ChartModule,
        ObjectGroupingModule
    ]
})
export class IndicatorsModule { }
