import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { InformationsPanelComponent } from './informations-panel.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { UserRightsTableModule } from '../user-rights-table/user-rights-table.module';
import { InputStatusComponent } from './components/input-status/input-status.component';
import { InputSaveComponent } from './components/input-save/input-save.component';


@NgModule({
  declarations: [InformationsPanelComponent, InputStatusComponent, InputSaveComponent],
  imports: [
    CommonModule,
    TranslateModule,
    MatSidenavModule,
    MatIconModule,
    MatExpansionModule,
    UserRightsTableModule
  ],
  exports: [
    InformationsPanelComponent
  ]
})
export class InformationsPanelModule { }
