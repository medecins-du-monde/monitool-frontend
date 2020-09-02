import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridComponent } from './grid.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { IndicatorModule } from '../indicator/indicator.module';

@NgModule({
  declarations: [GridComponent],
  imports: [
    CommonModule,
    MatGridListModule,
    IndicatorModule
  ],
  exports: [GridComponent]
})
export class GridModule { }
