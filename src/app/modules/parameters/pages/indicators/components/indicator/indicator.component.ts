import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { Indicator } from 'src/app/models/indicator.model';
import { IndicatorModalComponent } from '../indicator-modal/indicator-modal.component';

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

  ngOnInit(): void {}

  onDelete(): void {
    this.delete.emit(this.indicator.id);
  }

  openDialog() {
    const dialogRef = this.dialog.open(IndicatorModalComponent, { data: this.indicator });

    dialogRef.afterClosed().subscribe(res => {
      if (res && res.data) {
        this.edit.emit(res.data);
      }
    });
  }

}