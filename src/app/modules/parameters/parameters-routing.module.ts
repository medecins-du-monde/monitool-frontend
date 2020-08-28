import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './pages/users/users.component';
import { ThematicsComponent } from './pages/thematics/thematics.component';
import { IndicatorsComponent } from './pages/indicators/indicators.component';

const routes: Routes = [
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
  },
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParametersRoutingModule { }
