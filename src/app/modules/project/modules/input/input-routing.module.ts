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
    path: 'inputs/:formId/edit/:siteId/:timeSlot',
    loadChildren: () => import('./pages/edit/edit.module')
      .then(m => m.EditModule),
      canActivate : [BasicsInfosGuard]
  },
  {
    path: 'inputs/:formId',
    loadChildren: () => import('./pages/inputs/inputs.module')
      .then(m => m.InputsModule),
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
export class InputRoutingModule { }
