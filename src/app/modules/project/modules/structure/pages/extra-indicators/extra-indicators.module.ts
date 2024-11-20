import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import {  MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CdkTableModule } from '@angular/cdk/table';
import { TranslateModule } from '@ngx-translate/core';
import { ExtraIndicatorModule } from '../../components/extra-indicator/extra-indicator.module';
import { ExtraIndicatorsRoutingModule } from './extra-indicators-routing.module';
import { ExtraIndicatorsComponent } from './extra-indicators.component';

@NgModule({
    declarations: [ExtraIndicatorsComponent],
    imports: [
        CommonModule,
        TranslateModule,
        ExtraIndicatorsRoutingModule,
        ExtraIndicatorModule,
        MatButtonModule,
        MatIconModule,
        MatDialogModule,
        MatCardModule,
        ReactiveFormsModule,
        DragDropModule,
        CdkTableModule
    ]
})
export class ExtraIndicatorsModule { }
