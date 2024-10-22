import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { ExtraIndicatorModule } from '../../components/extra-indicator/extra-indicator.module';
import { CrossCuttingRoutingModule } from './cross-cutting-routing.module';
import { CrossCuttingComponent } from './cross-cutting.component';

@NgModule({
    declarations: [CrossCuttingComponent],
    imports: [
        CommonModule,
        TranslateModule,
        CrossCuttingRoutingModule,
        MatDialogModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        ExtraIndicatorModule,
    ]
})
export class CrossCuttingModule { }
