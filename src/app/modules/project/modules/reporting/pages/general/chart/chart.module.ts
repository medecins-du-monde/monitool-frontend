import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ChartComponent } from './chart.component';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
    declarations: [ChartComponent],
    exports: [ChartComponent],
    imports: [
        CommonModule,
        TranslateModule,
        MatSelectModule
    ]
})
export class ChartModule { }
