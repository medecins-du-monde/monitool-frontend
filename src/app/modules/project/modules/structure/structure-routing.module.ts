import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BasicsComponent } from './pages/basics/basics.component';
import { CrossCuttingComponent } from './pages/cross-cutting/cross-cutting.component';
import { DataSourcesComponent } from './pages/data-sources/data-sources.component';
import { ExtraIndicatorsComponent } from './pages/extra-indicators/extra-indicators.component';
import { HistoryComponent } from './pages/history/history.component';
import { LogicalFrameComponent } from './pages/logical-frame/logical-frame.component';
import { SitesComponent } from './pages/sites/sites.component';
import { UsersComponent } from './pages/users/users.component';
import { StructureComponent } from './structure.component';

const routes: Routes = [
  {
    path: '',
    component: StructureComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'basics',
        component: BasicsComponent
      },
      {
        path: 'cross-cutting',
        component: CrossCuttingComponent
      },
      {
        path: 'data-sources',
        component: DataSourcesComponent
      },
      {
        path: 'extra-indicators',
        component: ExtraIndicatorsComponent
      },
      {
        path: 'history',
        component: HistoryComponent
      },
      {
        path: 'logical-frame',
        component: LogicalFrameComponent
      },
      {
        path: 'sites',
        component: SitesComponent
      },
      {
        path: 'users',
        component: UsersComponent
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
