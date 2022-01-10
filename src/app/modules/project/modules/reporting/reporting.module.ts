import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportingRoutingModule } from './reporting-routing.module';
import { PersonalDashboardComponent } from './pages/personal-dashboard/personal-dashboard.component';

@NgModule({
  declarations: [PersonalDashboardComponent],
  imports: [
    CommonModule,
    ReportingRoutingModule
  ]
})
export class ReportingModule { }
