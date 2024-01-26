import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DownloadExcelPageComponent } from './download-excel-page/download-excel-page.component';
import { GeneralComponent } from './general.component';
import { PendingChangesGuard } from 'src/app/guards/pending-changes.guard';


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
    component: GeneralComponent,
    canDeactivate: [PendingChangesGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GeneralRoutingModule { }
