import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DataflowComponent } from './dataflow.component';

const routes: Routes = [{
  path: '',
  component: DataflowComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataflowRoutingModule { }
