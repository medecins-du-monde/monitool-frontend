import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { InputRoutingModule } from './input-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { TranslateModule } from '@ngx-translate/core';
import { ProgressBarModule } from 'src/app/components/progress-bar/progress-bar.module';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    TranslateModule,
    InputRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    ProgressBarModule
  ]
})
export class InputModule { }
