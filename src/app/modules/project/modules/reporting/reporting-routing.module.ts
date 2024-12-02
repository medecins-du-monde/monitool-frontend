import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BasicsInfosGuard } from 'src/app/guards/basics-infos.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module')
      .then(m => m.HomeModule),
      canActivate : [BasicsInfosGuard]
  },
  {
    path: 'general',
    loadChildren: () => import('./pages/general/general.module')
      .then(m => m.GeneralModule),
      canActivate : [BasicsInfosGuard]
  },{
    path: 'dataflow',
    loadChildren: () => import('./pages/dataflow/dataflow.module')
      .then(m => m.DataflowModule),
      canActivate : [BasicsInfosGuard]
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
