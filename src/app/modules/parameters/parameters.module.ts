import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParametersRoutingModule } from './parameters-routing.module';
import { UsersComponent } from './pages/users/users.component';
import { UserComponent } from './components/user/user.component';
import { ThematicsComponent } from './pages/thematics/thematics.component';
import { ThemeComponent } from './components/theme/theme.component';
import { IndicatorsComponent } from './pages/indicators/indicators.component';
import { IndicatorComponent } from './components/indicator/indicator.component';
import { ParametersComponent } from './parameters.component';
import { SidenavModule } from 'src/app/components/sidenav/sidenav.module';
import { SvgIconsModule } from '@ngneat/svg-icon';

@NgModule({
  declarations: [
    UsersComponent,
    UserComponent,
    ThematicsComponent,
    ThemeComponent,
    IndicatorsComponent,
    IndicatorComponent,
    ParametersComponent
  ],
  imports: [
    CommonModule,
    ParametersRoutingModule,
    SidenavModule,
    SvgIconsModule
  ]
})
export class ParametersModule { }
