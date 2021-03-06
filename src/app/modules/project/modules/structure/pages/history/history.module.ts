import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
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
