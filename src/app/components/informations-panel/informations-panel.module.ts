import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { InformationsPanelComponent } from './informations-panel.component';
import { MatSidenavModule } from '@angular/material/sidenav'; 
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion'; 


@NgModule({
  declarations: [InformationsPanelComponent],
  imports: [
    CommonModule,
    TranslateModule,
    MatSidenavModule,
    MatIconModule,
    MatExpansionModule
  ],
  exports: [
    InformationsPanelComponent
  ]
})
export class InformationsPanelModule { }
