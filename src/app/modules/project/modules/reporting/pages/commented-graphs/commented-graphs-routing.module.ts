import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommentedGraphsComponent } from './commented-graphs.component';
import { LogframesDashboardComponent } from './logframes-dashboard/logframes-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: CommentedGraphsComponent
  },
  {
    path: ':id',
    component: LogframesDashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommentedGraphsRoutingModule { }
