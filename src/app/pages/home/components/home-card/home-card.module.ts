import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeCardComponent } from './home-card.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [HomeCardComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule
  ],
  exports: [HomeCardComponent]
})
export class HomeCardModule { }
