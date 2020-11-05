import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AuthGuardService as AuthGuard } from './guards/auth-guard.service';

const routes: Routes = [{
  path: '',
  redirectTo: 'home',
  pathMatch: 'full'
},
{
  path: 'login',
  loadChildren: () => import('./components/login/login.module')
  .then(m => m.LoginModule),
  // component: LoginComponent,
},
{
  path: 'home',
  loadChildren: () => import('./pages/home/home.module')
    .then(m => m.HomeModule),
  canActivate : [AuthGuard]
},
{
  path: 'project/:id',
  loadChildren: () => import('./modules/project/project.module')
    .then(m => m.ProjectModule),
  canActivate : [AuthGuard],
},
{
  path: 'projects',
  loadChildren: () => import('./pages/projects/projects.module')
    .then(m => m.ProjectsModule),
  canActivate : [AuthGuard]
},
{
  path: 'parameters',
  loadChildren: () => import('./modules/parameters/parameters.module')
    .then(m => m.ParametersModule),
  canActivate : [AuthGuard]
},
{
  path: 'indicators',
  loadChildren: () => import('./pages/indicators/indicators.module')
    .then(m => m.IndicatorsModule),
  canActivate : [AuthGuard]
},
{
  path: '**',
  redirectTo: 'home',
  pathMatch: 'full'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
