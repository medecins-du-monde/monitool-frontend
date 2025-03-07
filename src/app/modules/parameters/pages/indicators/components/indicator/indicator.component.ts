import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { TranslateService } from '@ngx-translate/core';
import { Indicator } from 'src/app/models/classes/indicator.model';
import { IndicatorModalComponent } from '../indicator-modal/indicator-modal.component';
import { ConfirmModalComponent } from 'src/app/components/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-indicator',
  templateUrl: './indicator.component.html',
  styleUrls: ['./indicator.component.scss']
})
export class IndicatorComponent implements OnInit {

  @Input() indicator: Indicator;

  @Output() delete = new EventEmitter();

  @Output() edit = new EventEmitter();

  get currentLang() {
    return this.translateService.currentLang ? this.translateService.currentLang : this.translateService.defaultLang;
  }

  constructor(
    private dialog: MatDialog,
    private translateService: TranslateService
  ) { }

  ngOnInit(): void {
    //
  }

  onDelete(): void {
    this.confirmDeletion();
  }

  openDialog() {
    const dialogRef = this.dialog.open(IndicatorModalComponent, { data: this.indicator });

    const dialogSubscription = dialogRef.afterClosed().subscribe(res => {
      if (res && res.data) {
        this.edit.emit(res.data);
        dialogSubscription.unsubscribe();
      }
    });
  }

  confirmDeletion(): void {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {data: {messageId: 'DeleteConfirmation'}});
    const dialogSubscription = dialogRef.afterClosed().subscribe(res => {
      if (res.confirm){
        this.delete.emit(this.indicator.id);
        dialogSubscription.unsubscribe();
      }
    });
  }

}
