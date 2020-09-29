import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StructureComponent } from './structure.component';

const routes: Routes = [
  {
    path: '',
    component: StructureComponent,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./pages/home/home.module')
        .then(m => m.HomeModule)
      },
      {
        path: 'basics',
        loadChildren: () => import('./pages/basics/basics.module')
        .then(m => m.BasicsModule)
      },
      {
        path: 'cross-cutting',
        loadChildren: () => import('./pages/cross-cutting/cross-cutting.module')
        .then(m => m.CrossCuttingModule)
      },
      {
        path: 'data-sources',
        loadChildren: () => import('./pages/data-sources/data-sources.module')
        .then(m => m.DataSourcesModule)
      },
      // {
      //   path: 'extra-indicators',
      //   loadChildren: () => import('./pages/extra-indicators/extra-indicators.module')
      //   .then(m => m.ExtraIndicatorsModule)
      // },
      {
        path: 'history',
        loadChildren: () => import('./pages/history/history.module')
        .then(m => m.HistoryModule)
      },
      {
        path: 'logical-frame',
        loadChildren: () => import('./pages/logical-frame/logical-frame.module')
        .then(m => m.LogicalFrameModule)
      },
      {
        path: 'sites',
        loadChildren: () => import('./pages/sites/sites.module')
        .then(m => m.SitesModule)
      },
      {
        path: 'users',
        loadChildren: () => import('./pages/users/users.module')
        .then(m => m.UsersModule)
      },
      {
        path: '**',
        redirectTo: 'home',
        pathMatch: 'full',
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StructureRoutingModule { }
