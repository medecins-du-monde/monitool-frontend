import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParametersRoutingModule } from './parameters-routing.module';
import { ParametersComponent } from './parameters.component';
import { SidenavModule } from 'src/app/components/sidenav/sidenav.module';
import { MatSidenavModule } from '@angular/material/sidenav';

@NgModule({
  declarations: [ParametersComponent],
  imports: [
    CommonModule,
    ParametersRoutingModule,
    SidenavModule,
    MatSidenavModule
  ]
})
export class ParametersModule { }
