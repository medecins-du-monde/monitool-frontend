import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmModalComponent } from 'src/app/components/confirm-modal/confirm-modal.component';
import { Theme } from 'src/app/models/classes/theme.model';
import { ThemeModalComponent } from '../theme-modal/theme-modal.component';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.scss']
})
export class ThemeComponent implements OnInit {

  @Input() theme: Theme;

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
    // do something about this
  }

  onDelete(): void {
    this.confirmDeletion();
  }

  openDialog() {
    const dialogRef = this.dialog.open(ThemeModalComponent, { data: this.theme });

    dialogRef.afterClosed().subscribe(res => {
      if (res && res.data) {
        this.edit.emit(res.data);
      }
    });
  }

  confirmDeletion(): void {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {data: {messageId: 'DeleteConfirmation'}});
    dialogRef.afterClosed().subscribe(res => {
      if (res.confirm){
        this.delete.emit(this.theme.id);
      }
    });
  }
}
