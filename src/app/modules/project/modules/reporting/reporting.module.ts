import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { ReportingRoutingModule } from './reporting-routing.module';
import { GeneralComponent } from './pages/general/general.component';
import { PivotTableComponent } from './pages/pivot-table/pivot-table.component';



@NgModule({
  declarations: [HomeComponent, GeneralComponent, PivotTableComponent],
  imports: [
    CommonModule,
    ReportingRoutingModule
  ]
})
export class ReportingModule { }
