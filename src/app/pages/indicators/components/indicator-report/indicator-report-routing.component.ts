import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndicatorReportComponent } from './indicator-report.component';
import { DownloadExcelPageComponent } from 'src/app/modules/project/modules/reporting/pages/general/download-excel-page/download-excel-page.component';


const routes: Routes = [
  {
    path: 'download',
    component: DownloadExcelPageComponent,
  },
  {
    path: 'download/:data',
    component: DownloadExcelPageComponent,
  },
  {
    path: 'download/:data/:id',
    component: DownloadExcelPageComponent,
  },
  {
    path: '',
    component: IndicatorReportComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndicatorReportRoutingModule { }
