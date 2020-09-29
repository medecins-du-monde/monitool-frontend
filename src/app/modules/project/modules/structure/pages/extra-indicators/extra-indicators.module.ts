import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { ExtraIndicatorsRoutingModule } from './extra-indicators-routing.module';
import { ExtraIndicatorsComponent } from './extra-indicators.component';

@NgModule({
    declarations: [ExtraIndicatorsComponent],
    imports: [
        CommonModule,
        TranslateModule,
        ExtraIndicatorsRoutingModule,
        ExtraIndicatorsModule,
        MatButtonModule,
        MatIconModule
    ]
})
export class ExtraIndicatorsModule { }
