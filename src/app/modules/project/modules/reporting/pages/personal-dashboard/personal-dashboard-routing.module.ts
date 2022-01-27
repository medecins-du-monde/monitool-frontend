import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PersonalDashboardComponent } from './personal-dashboard.component';

const routes: Routes = [{
  path: '',
  component: PersonalDashboardComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonalDashboardRoutingModule { }
