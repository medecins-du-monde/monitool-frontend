import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InformationComponent } from './information.component';
import { InformationRoutingModule } from './information-routing.module';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [InformationComponent],
  imports: [
    CommonModule,
    InformationRoutingModule,
    TranslateModule
  ]
})
export class InformationModule { }
