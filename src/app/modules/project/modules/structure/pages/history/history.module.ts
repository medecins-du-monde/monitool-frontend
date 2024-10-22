import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { TranslateModule } from '@ngx-translate/core';
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
        MatIconModule,
        RevisionSummaryModule
    ]
})
export class HistoryModule { }
