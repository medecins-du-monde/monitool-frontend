import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ObjectGroupingComponent } from './object-grouping.component';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';
import { ConfirmExportComponent } from './confirm-export/confirm-export.component';

@NgModule({
    declarations: [ObjectGroupingComponent, ConfirmExportComponent],
    exports: [ObjectGroupingComponent],
    imports: [
        CommonModule,
        TranslateModule,
        MatSelectModule,
        MatIconModule,
        MatGridListModule,
        MatButtonModule,
        MatDialogModule,
        FormsModule,
        ReactiveFormsModule,
        MatTooltipModule,
        MatDialogModule
    ]
})
export class ObjectGroupingModule { }
