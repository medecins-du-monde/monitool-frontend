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
import { BreadcrumbModule } from 'src/app/components/breadcrumb/breadcrumb.module';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { ExportModalComponent } from './components/export-modal/export-modal.component';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
    declarations: [IndicatorsComponent, IndicatorReportComponent, ExportModalComponent],
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
    IndicatorReportRoutingModule,
    BreadcrumbModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ]
})
export class IndicatorsModule { }
