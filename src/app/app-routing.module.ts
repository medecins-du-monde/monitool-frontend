import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { IndicatorsComponent } from './pages/indicators/indicators.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuardService as AuthGuard } from './services/auth-guard.service';


const routes: Routes = [{
  path: '',
  redirectTo: 'home',
  pathMatch: 'full'
},
{
  path: 'login',
  component: LoginComponent,
},
{
  path: 'home',
  component: HomeComponent,
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
  component: ProjectsComponent,
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
  component: IndicatorsComponent,
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
