import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommentedGraphsRoutingModule } from './commented-graphs-routing.module';
import { CommentedGraphsComponent } from './commented-graphs.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { LogframesDashboardComponent } from './logframes-dashboard/logframes-dashboard.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu'; 

@NgModule({
  declarations: [CommentedGraphsComponent, LogframesDashboardComponent],
  imports: [
    CommonModule,
    CommentedGraphsRoutingModule,
    MatCardModule,
    MatIconModule,
    MatExpansionModule,
    MatMenuModule
  ]
})
export class CommentedGraphsModule { }
