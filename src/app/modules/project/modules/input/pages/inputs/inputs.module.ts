import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InputsRoutingModule } from './inputs-routing.module';
import { InputsComponent } from './inputs.component';


@NgModule({
  declarations: [InputsComponent],
  imports: [
    CommonModule,
    InputsRoutingModule
  ]
})
export class InputsModule { }
