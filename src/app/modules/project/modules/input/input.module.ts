import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { InputRoutingModule } from './input-routing.module';



@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    InputRoutingModule
  ]
})
export class InputModule { }
