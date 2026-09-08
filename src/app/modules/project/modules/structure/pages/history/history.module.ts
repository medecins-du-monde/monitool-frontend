import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { TranslateModule } from '@ngx-translate/core';
import { ConfirmModalModule } from 'src/app/components/confirm-modal/confirm-modal.module';
import { HistoryRoutingModule } from './history-routing.module';
import { HistoryComponent } from './history.component';
import { RevisionSummaryModule } from './revision-summary/revision-summary.module';

@NgModule({
    declarations: [HistoryComponent],
    imports: [
        CommonModule,
        TranslateModule,
        HistoryRoutingModule,
        MatTableModule,
        MatButtonModule,
        MatDialogModule,
        MatIconModule,
        ConfirmModalModule,
        RevisionSummaryModule
    ]
})
export class HistoryModule { }
