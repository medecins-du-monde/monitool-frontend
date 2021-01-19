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
    path: 'inputs/:formId/edit/:siteId/:timeSlot',
    loadChildren: () => import('./pages/edit/edit.module')
      .then(m => m.EditModule),
    canDeactivate: [PendingChangesGuard]
  },
  {
    path: 'inputs/:formId',
    loadChildren: () => import('./pages/inputs/inputs.module')
      .then(m => m.InputsModule),
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
export class InputRoutingModule { }
