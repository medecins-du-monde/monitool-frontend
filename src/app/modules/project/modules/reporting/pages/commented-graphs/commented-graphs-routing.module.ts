import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommentedGraphsComponent } from './commented-graphs.component';

const routes: Routes = [{
  path:'',
  component: CommentedGraphsComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommentedGraphsRoutingModule { }
