import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { InputRoutingModule } from './input-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { TranslateModule } from '@ngx-translate/core';
import { ProgressBarTripleModule } from 'src/app/components/progress-bar-triple/progress-bar-triple.module';
import { SupervisionReportComponent } from './pages/supervision-report/supervision-report.component';


@NgModule({
  declarations: [HomeComponent, SupervisionReportComponent],
  imports: [
    CommonModule,
    TranslateModule,
    InputRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    ProgressBarTripleModule
  ]
})
export class InputModule { }
