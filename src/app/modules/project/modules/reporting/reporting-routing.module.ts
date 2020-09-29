import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module')
      .then(m => m.HomeModule)
  },
  {
    path: 'general',
    loadChildren: () => import('./pages/general/general.module')
      .then(m => m.GeneralModule)
  },
  {
    path: 'pivot-table',
    loadChildren: () => import('./pages/pivot-table/pivot-table.module')
      .then(m => m.PivotTableModule)
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportingRoutingModule { }
