import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { StructureRoutingModule } from './structure-routing.module';



@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    StructureRoutingModule
  ]
})
export class StructureModule { }
