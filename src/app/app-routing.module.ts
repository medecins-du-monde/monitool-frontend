import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './mainPages/home/home.component';
import { ProjectsComponent } from './mainPages/projects/projects.component';

import { IndicatorsComponent } from './mainPages/indicators/indicators.component';


const routes: Routes = [{
  path: '',
  redirectTo: 'home',
  pathMatch: 'full'
},
{
  path: 'home',
  component: HomeComponent
},
{
  path: 'project/:id',
  loadChildren: () => import('./modules/project/project.module')
    .then(m => m.ProjectModule)
},
{
  path: 'projects',
  component: ProjectsComponent
},
{
  path: 'parameters',
  loadChildren: () => import('./modules/parameters/parameters.module')
    .then(m => m.ParametersModule)
},
{
  path: 'indicators',
  component: IndicatorsComponent
},
{
  path: '**',
  redirectTo: 'home',
  pathMatch: 'full'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
