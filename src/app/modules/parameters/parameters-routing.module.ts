import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './pages/users/users.component';
import { ThematicsComponent } from './pages/thematics/thematics.component';
import { IndicatorsComponent } from './pages/indicators/indicators.component';
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
        component: ThematicsComponent
      },
      {
        path: 'indicators',
        component: IndicatorsComponent
      },
      {
        path: 'users',
        component: UsersComponent
      },
      {
        path: 'themes',
        component: ThematicsComponent
      },
      {
        path: 'indicators',
        component: IndicatorsComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParametersRoutingModule { }
