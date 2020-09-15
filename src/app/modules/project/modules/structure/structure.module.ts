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
import { UserModule } from './components/user/user.module';
import { UserModalModule } from './components/user-modal/user-modal.module';
import { MatDialogModule } from '@angular/material/dialog';
import { CrossCuttingIndicatorModule } from 'src/app/modules/project/modules/structure/components/cross-cutting-indicator/cross-cutting-indicator.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';


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
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    StructureRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatChipsModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    ProgressBarModule,
    UserModule,
    UserModalModule,
    CrossCuttingIndicatorModule,
    MatCardModule,
    MatMenuModule
  ],
  providers: [
    MatDatepickerModule,
    MatNativeDateModule
  ]
})
export class StructureModule { }
