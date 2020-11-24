import { FullscreenOverlayContainer } from '@angular/cdk/overlay';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { BasicsModule } from '../basics/basics.module';


const routes: Routes = [{
  path: '',
  component: HomeComponent
  },
  {
  path: 'basics',
  //component: BasicsComponent,
  loadChildren: () => import('../basics/basics.module').then(m => m.BasicsModule)
  },
  {
    path: 'cross-cutting',
    loadChildren: () => import('../cross-cutting/cross-cutting.module').then(m => m.CrossCuttingModule)
  },
  {
    path: 'data-sources',
    loadChildren: () => import('../data-sources/data-sources.module').then(m => m.DataSourcesModule)
  },
  {
    path: 'extra-indicators',
    loadChildren: () => import('../extra-indicators/extra-indicators.module').then(m => m.ExtraIndicatorsModule)
  },
  {
    path: 'history',
    loadChildren: () => import('../history/history.module').then(m => m.HistoryModule)
  },
  {
    path: 'logical-frames',
    loadChildren: () => import('../logical-frames/logical-frames.module').then(m => m.LogicalFramesModule)
  },
  {
    path: 'sites',
    loadChildren: () => import('../sites/sites.module').then(m => m.SitesModule)
  },
  {
    path: 'users',
    loadChildren: () => import('../users/users.module').then(m => m.UsersModule)
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }


