import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ObjectGroupingComponent } from './object-grouping.component';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
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
