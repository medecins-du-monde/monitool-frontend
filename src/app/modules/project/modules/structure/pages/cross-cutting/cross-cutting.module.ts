import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CrossCuttingIndicatorModule } from '../../components/cross-cutting-indicator/cross-cutting-indicator.module';
import { CrossCuttingRoutingModule } from './cross-cutting-routing.module';
import { CrossCuttingComponent } from './cross-cutting.component';

@NgModule({
    declarations: [CrossCuttingComponent],
    imports: [
        CommonModule,
        TranslateModule,
        CrossCuttingRoutingModule,
        CrossCuttingIndicatorModule
    ]
})
export class CrossCuttingModule { }
