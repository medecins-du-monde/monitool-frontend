import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ParametersComponent } from './parameters.component';

const routes: Routes = [
  {
    path: '',
    component: ParametersComponent,
    children: [
      {
        path: '',
        redirectTo: 'users',
        pathMatch: 'full'
      },
      {
        path: 'themes',
        loadChildren: () => import('./pages/thematics/thematics.module')
          .then(m => m.ThematicsModule),
      },
      {
        path: 'indicators',
        loadChildren: () => import('./pages/indicators/indicators.module')
          .then(m => m.IndicatorsModule),
      },
      {
        path: 'users',
        loadChildren: () => import('./pages/users/users.module')
          .then(m => m.UsersModule),
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParametersRoutingModule { }
