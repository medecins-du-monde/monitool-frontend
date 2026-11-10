import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ImportErrorsComponent } from './import-errors.component';

@NgModule({
  declarations: [ImportErrorsComponent],
  imports: [CommonModule, MatIconModule],
  exports: [ImportErrorsComponent]
})
export class ImportErrorsModule { }
