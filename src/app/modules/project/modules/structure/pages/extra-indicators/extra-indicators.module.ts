import { MatCardModule } from '@angular/material/card';
import {  MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
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
