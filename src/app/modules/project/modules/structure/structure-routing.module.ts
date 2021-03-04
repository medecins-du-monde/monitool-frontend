import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BasicsInfosGuard } from 'src/app/guards/basics-infos.guard';
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
        canDeactivate: [PendingChangesGuard],
        canActivate : [BasicsInfosGuard]

      },
      {
        path: 'data-sources',
        loadChildren: () => import('./pages/data-sources/data-sources.module')
        .then(m => m.DataSourcesModule),
        canDeactivate: [PendingChangesGuard],
        canActivate : [BasicsInfosGuard]
      },
      {
        path: 'extra-indicators',
        loadChildren: () => import('./pages/extra-indicators/extra-indicators.module')
        .then(m => m.ExtraIndicatorsModule),
        canDeactivate: [PendingChangesGuard],
        canActivate : [BasicsInfosGuard]
      },
      {
        path: 'history',
        loadChildren: () => import('./pages/history/history.module')
        .then(m => m.HistoryModule),
        canDeactivate: [PendingChangesGuard],
        canActivate : [BasicsInfosGuard]
      },
      {
        path: 'logical-frames',
        loadChildren: () => import('./pages/logical-frames/logical-frames.module')
        .then(m => m.LogicalFramesModule),
        canDeactivate: [PendingChangesGuard],
        canActivate : [BasicsInfosGuard]
      },
      {
        path: 'sites',
        loadChildren: () => import('./pages/sites/sites.module')
        .then(m => m.SitesModule),
        canDeactivate: [PendingChangesGuard],
        canActivate : [BasicsInfosGuard]
      },
      {
        path: 'users',
        loadChildren: () => import('./pages/users/users.module')
        .then(m => m.UsersModule),
        canDeactivate: [PendingChangesGuard],
        canActivate : [BasicsInfosGuard]
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
