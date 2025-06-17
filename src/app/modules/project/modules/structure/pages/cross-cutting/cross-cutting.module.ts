import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { ExtraIndicatorModule } from '../../components/extra-indicator/extra-indicator.module';
import { CrossCuttingRoutingModule } from './cross-cutting-routing.module';
import { CrossCuttingComponent } from './cross-cutting.component';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { MatLegacyChipsModule as MatChipsModule } from '@angular/material/legacy-chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatLegacyCheckboxModule as MatCheckboxModule } from '@angular/material/legacy-checkbox';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';

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
        MatExpansionModule,
        MatTableModule,
        MatChipsModule,
        MatCheckboxModule,
        MatTooltipModule,
        MatIconModule,
        MatButtonModule
    ]
})
export class CrossCuttingModule { }
