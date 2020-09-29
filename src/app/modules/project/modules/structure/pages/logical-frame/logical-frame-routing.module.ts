import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogicalFrameComponent } from './logical-frame.component';


const routes: Routes = [{
  path: '',
  component: LogicalFrameComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LogicalFrameRoutingModule { }
