import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { ParametersRoutingModule } from './parameters-routing.module';
import { UsersComponent } from './pages/users/users.component';
import { UserComponent } from './components/user/user.component';
import { ThematicsComponent } from './pages/thematics/thematics.component';
import { ThemeComponent } from './components/theme/theme.component';
import { IndicatorsComponent } from './pages/indicators/indicators.component';
import { IndicatorComponent } from './components/indicator/indicator.component';

@NgModule({
  declarations: [SidenavComponent,
    UsersComponent,
    UserComponent,
    ThematicsComponent,
    ThemeComponent,
    IndicatorsComponent,
    IndicatorComponent
  ],
  imports: [
    CommonModule,
    ParametersRoutingModule
  ]
})
export class ParametersModule { }
