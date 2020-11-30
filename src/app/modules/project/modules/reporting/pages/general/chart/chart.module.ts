import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ChartComponent } from './chart.component';

@NgModule({
    declarations: [ChartComponent],
    exports: [ChartComponent],
    imports: [
        CommonModule,
        TranslateModule
    ]
})
export class ChartModule { }
