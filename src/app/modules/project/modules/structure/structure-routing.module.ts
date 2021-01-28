import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PendingChangesGuard } from 'src/app/guards/pending-changes.guard';
import { StructureComponent } from './structure.component';

const routes: Routes = [
  {
    path: '',
    component: StructureComponent,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./pages/home/home.module')
        .then(m => m.HomeModule),
        canDeactivate: [PendingChangesGuard]
      },
      {
        path: 'basics',
        loadChildren: () => import('./pages/basics/basics.module')
        .then(m => m.BasicsModule),
        canDeactivate: [PendingChangesGuard]
      },
      {
        path: 'cross-cutting',
        loadChildren: () => import('./pages/cross-cutting/cross-cutting.module')
        .then(m => m.CrossCuttingModule),
        canDeactivate: [PendingChangesGuard]
      },
      {
        path: 'data-sources',
        loadChildren: () => import('./pages/data-sources/data-sources.module')
        .then(m => m.DataSourcesModule),
        canDeactivate: [PendingChangesGuard]
      },
      {
        path: 'extra-indicators',
        loadChildren: () => import('./pages/extra-indicators/extra-indicators.module')
        .then(m => m.ExtraIndicatorsModule),
        canDeactivate: [PendingChangesGuard]
      },
      {
        path: 'history',
        loadChildren: () => import('./pages/history/history.module')
        .then(m => m.HistoryModule),
        canDeactivate: [PendingChangesGuard]
      },
      {
        path: 'logical-frames',
        loadChildren: () => import('./pages/logical-frames/logical-frames.module')
        .then(m => m.LogicalFramesModule),
        canDeactivate: [PendingChangesGuard]
      },
      {
        path: 'sites',
        loadChildren: () => import('./pages/sites/sites.module')
        .then(m => m.SitesModule),
        canDeactivate: [PendingChangesGuard]
      },
      {
        path: 'users',
        loadChildren: () => import('./pages/users/users.module')
        .then(m => m.UsersModule),
        canDeactivate: [PendingChangesGuard]
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
