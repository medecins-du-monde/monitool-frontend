import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParametersRoutingModule } from './parameters-routing.module';
import { UsersComponent } from './pages/users/users.component';
import { ThematicsComponent } from './pages/thematics/thematics.component';
import { IndicatorsComponent } from './pages/indicators/indicators.component';
import { ParametersComponent } from './parameters.component';
import { SidenavModule } from 'src/app/components/sidenav/sidenav.module';
import { SvgIconsModule } from '@ngneat/svg-icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { IndicatorModule } from './components/indicator/indicator.module';
import { ThemeModule } from './components/theme/theme.module';
import { UserModule } from './components/user/user.module';

@NgModule({
  declarations: [
    UsersComponent,
    ThematicsComponent,
    IndicatorsComponent,
    ParametersComponent
  ],
  imports: [
    CommonModule,
    ParametersRoutingModule,
    SidenavModule,
    SvgIconsModule,
    MatSidenavModule,
    MatGridListModule,
    MatButtonModule,
    MatIconModule,
    IndicatorModule,
    ThemeModule,
    UserModule
  ]
})
export class ParametersModule { }
