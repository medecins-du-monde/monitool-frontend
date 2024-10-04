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
import {InformationsPanelModule} from '../../components/informations-panel/informations-panel.module';
import { IndicatorReportRoutingModule } from './components/indicator-report/indicator-report-routing.component';

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
    ObjectGroupingModule,
    InformationsPanelModule,
    IndicatorReportRoutingModule
  ]
})
export class IndicatorsModule { }
