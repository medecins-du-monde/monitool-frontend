import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './pages/users/users.component';
import { ThematicsComponent } from './pages/thematics/thematics.component';

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
    path: '',
    redirectTo: 'users',
    pathMatch: 'full',
  },
  // {
  //   path: '**',
  //   redirectTo: 'users',
  //   pathMatch: 'full',
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParametersRoutingModule { }
