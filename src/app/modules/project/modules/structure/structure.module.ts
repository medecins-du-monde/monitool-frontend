import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { StructureRoutingModule } from './structure-routing.module';
import { BasicsComponent } from './pages/basics/basics.component';
import { SitesComponent } from './pages/sites/sites.component';
import { DataSourceComponent } from './pages/data-source/data-source.component';
import { LogicalFrameComponent } from './pages/logical-frame/logical-frame.component';
import { CrossCuttingComponent } from './pages/cross-cutting/cross-cutting.component';
import { ExtraIndicatorsComponent } from './pages/extra-indicators/extra-indicators.component';
import { UsersComponent } from './pages/users/users.component';
import { HistoryComponent } from './pages/history/history.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    HomeComponent,
    BasicsComponent,
    SitesComponent,
    DataSourceComponent,
    LogicalFrameComponent,
    CrossCuttingComponent,
    ExtraIndicatorsComponent,
    UsersComponent,
    HistoryComponent
  ],
  imports: [
    CommonModule,
    StructureRoutingModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class StructureModule { }
