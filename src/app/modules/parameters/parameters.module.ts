import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParametersRoutingModule } from './parameters-routing.module';
import { ParametersComponent } from './parameters.component';
import { SidenavModule } from 'src/app/components/sidenav/sidenav.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import {InformationsPanelModule} from '../../components/informations-panel/informations-panel.module';

@NgModule({
  declarations: [ParametersComponent],
  imports: [
    CommonModule,
    ParametersRoutingModule,
    SidenavModule,
    MatSidenavModule,
    InformationsPanelModule
  ]
})
export class ParametersModule { }
