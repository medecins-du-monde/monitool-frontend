import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
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
},
{
  path: 'home',
  loadChildren: () => import('./pages/home/home.module')
    .then(m => m.HomeModule),
  canActivate : [AuthGuard]
},
{
  path: 'projects/:id',
  loadChildren: () => import('./modules/project/project.module')
    .then(m => m.ProjectModule),
  canActivate : [AuthGuard],
},
{
  path: 'projects',
  data: { roles: ['user']  },
  loadChildren: () => import('./pages/projects/projects.module')
    .then(m => m.ProjectsModule),
  canActivate : [AuthGuard]
},
{
  path: 'parameters',
  data: { roles: ['user']  },
  loadChildren: () => import('./modules/parameters/parameters.module')
    .then(m => m.ParametersModule),
 canActivate : [AuthGuard]
},
{
  path: 'indicators',
  data: { roles: ['user']  },
  loadChildren: () => import('./pages/indicators/indicators.module')
    .then(m => m.IndicatorsModule),
  canActivate : [AuthGuard]
},
{
  path: 'info',
  loadChildren: () => import('./pages/information/information.module')
    .then(m => m.InformationModule),
  canActivate : [AuthGuard]
},
{
  path: '**',
  redirectTo: 'home',
  pathMatch: 'full'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules,
    relativeLinkResolution: 'legacy'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
