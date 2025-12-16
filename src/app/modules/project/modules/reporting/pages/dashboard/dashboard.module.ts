import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component';

import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { DashboardRoutingModule } from './dashboard-routing.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    TranslateModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
