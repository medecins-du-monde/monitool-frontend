import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { ParametersRoutingModule } from './parameters-routing.module';
import { UsersComponent } from './pages/users/users.component';
import { UserComponent } from './components/user/user.component';
import { ThematicsComponent } from './pages/thematics/thematics.component';
import { ThemeComponent } from './components/theme/theme.component';

@NgModule({
  declarations: [SidenavComponent,
    UsersComponent,
    UserComponent,
    ThematicsComponent,
    ThemeComponent
  ],
  imports: [
    CommonModule,
    ParametersRoutingModule
  ]
})
export class ParametersModule { }
