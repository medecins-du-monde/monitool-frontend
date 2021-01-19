import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PendingChangesGuard } from 'src/app/guards/pending-changes.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module')
      .then(m => m.HomeModule),
      canDeactivate: [PendingChangesGuard]
  },
  {
    path: 'general',
    loadChildren: () => import('./pages/general/general.module')
      .then(m => m.GeneralModule),
      canDeactivate: [PendingChangesGuard]
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
