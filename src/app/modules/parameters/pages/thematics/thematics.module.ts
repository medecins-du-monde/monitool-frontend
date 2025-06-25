import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { ThemeModule } from './components/theme/theme.module';
import { ThematicsRoutingModule } from './thematics-routing.module';
import { ThematicsComponent } from './thematics.component';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';

@NgModule({
    declarations: [ThematicsComponent],
    imports: [
        CommonModule,
        TranslateModule,
        ThematicsRoutingModule,
        ThemeModule,
        MatButtonModule,
        MatIconModule,
        MatTooltipModule
    ]
})
export class ThematicsModule { }
