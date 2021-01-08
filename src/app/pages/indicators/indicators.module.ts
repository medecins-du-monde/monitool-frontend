import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IndicatorModule } from 'src/app/components/indicator/indicator.module';
import { IndicatorsRoutingModule } from './indicators-routing.module';
import { IndicatorsComponent } from './indicators.component';
import { IndicatorReportComponent } from './components/indicator-report/indicator-report.component';
import { ChartModule } from 'src/app/components/chart/chart.module';
import { FilterModule } from 'src/app/components/report/filter/filter.module';
import { ReportingTableModule } from 'src/app/components/report/reporting-table/reporting-table.module';
import { ObjectGroupingModule } from 'src/app/components/report/objectGrouping/object-grouping.module';

@NgModule({
    declarations: [IndicatorsComponent, IndicatorReportComponent],
    imports: [
        CommonModule,
        TranslateModule,
        IndicatorsRoutingModule,
        IndicatorModule,
        FilterModule,
        ReportingTableModule,
        ChartModule,
        ObjectGroupingModule
    ]
})
export class IndicatorsModule { }
