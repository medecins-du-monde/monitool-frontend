import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PivotTableComponent } from './pivot-table.component';


const routes: Routes = [{
  path: '',
  component: PivotTableComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PivotTableRoutingModule { }
