import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommentedGraphsRoutingModule } from './commented-graphs-routing.module';
import { CommentedGraphsComponent } from './commented-graphs.component';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatIconModule } from '@angular/material/icon';
import { LogframesDashboardComponent } from './logframes-dashboard/logframes-dashboard.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatLegacyMenuModule as MatMenuModule } from '@angular/material/legacy-menu';

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
