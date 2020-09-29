import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeIllustrationComponent } from './home-illustration.component';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [HomeIllustrationComponent],
  imports: [
    CommonModule,
    MatCardModule
  ],
  exports: [HomeIllustrationComponent]
})
export class HomeIllustrationModule { }
