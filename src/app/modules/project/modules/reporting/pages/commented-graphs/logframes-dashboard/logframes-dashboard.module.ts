import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LogframesDashboardRoutingModule } from './logframes-dashboard-routing.module';
import { MatExpansionModule } from '@angular/material/expansion'; 
import { MatMenuModule } from '@angular/material/menu'; 

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LogframesDashboardRoutingModule,
    MatExpansionModule,
    MatMenuModule
  ]
})
export class LogframesDashboardModule { }
