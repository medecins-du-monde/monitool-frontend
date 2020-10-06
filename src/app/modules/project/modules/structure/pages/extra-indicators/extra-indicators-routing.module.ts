import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExtraIndicatorsComponent } from './extra-indicators.component';


const routes: Routes = [{
  path: '',
  component: ExtraIndicatorsComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExtraIndicatorsRoutingModule { }
