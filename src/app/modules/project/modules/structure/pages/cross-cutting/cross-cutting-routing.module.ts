import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrossCuttingComponent } from './cross-cutting.component';


const routes: Routes = [{
  path: '',
  component: CrossCuttingComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrossCuttingRoutingModule { }
