import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogicalFramesComponent } from './logical-frames.component';


const routes: Routes = [{
  path: '',
  component: LogicalFramesComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LogicalFramesRoutingModule { }
