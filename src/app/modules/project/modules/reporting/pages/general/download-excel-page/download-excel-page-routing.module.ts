import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DownloadExcelPageComponent } from './download-excel-page.component';


const routes: Routes = [{
  path: '',
  component: DownloadExcelPageComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DownloadExcelPageRoutingModule { }
