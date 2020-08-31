import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { ReportingRoutingModule } from './reporting-routing.module';



@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    ReportingRoutingModule
  ]
})
export class ReportingModule { }
