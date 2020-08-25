import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { ParametersRoutingModule } from './parameters-routing.module';
import { ParametersComponent } from './pages/parameters/parameters.component';
import { UsersComponent } from './pages/users/users.component';
import { UserComponent } from './components/user/user.component';

@NgModule({
  declarations: [SidenavComponent,
    ParametersComponent,
    UsersComponent,
    UserComponent,
  ],
  imports: [
    CommonModule,
    ParametersRoutingModule
  ]
})
export class ParametersModule { }
