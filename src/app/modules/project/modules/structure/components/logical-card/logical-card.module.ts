import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogicalCardComponent } from './logical-card.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [LogicalCardComponent],
  imports: [
    CommonModule,
    TranslateModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    
  ],
  exports: [LogicalCardComponent]
})
export class LogicalCardModule { }
