import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InputsRoutingModule } from './inputs-routing.module';
import { InputsComponent } from './inputs.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [InputsComponent],
  imports: [
    CommonModule,
    InputsRoutingModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class InputsModule { }
