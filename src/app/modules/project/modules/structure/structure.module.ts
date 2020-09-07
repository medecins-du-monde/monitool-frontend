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
import { MatTableModule } from '@angular/material/table';
import { TranslateModule } from '@ngx-translate/core';
import { ProgressBarModule } from 'src/app/components/progress-bar/progress-bar.module';

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
    HistoryComponent,
  ],
  imports: [
    CommonModule,
    TranslateModule,
    StructureRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    ProgressBarModule
  ]
})
export class StructureModule { }
