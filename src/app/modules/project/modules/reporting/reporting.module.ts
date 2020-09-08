import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { ReportingRoutingModule } from './reporting-routing.module';
import { GeneralComponent } from './pages/general/general.component';
import { PivotTableComponent } from './pages/pivot-table/pivot-table.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    HomeComponent,
    GeneralComponent,
    PivotTableComponent
  ],
  imports: [
    CommonModule,
    ReportingRoutingModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class ReportingModule { }
