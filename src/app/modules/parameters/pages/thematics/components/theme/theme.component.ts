import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { Theme } from 'src/app/models/classes/theme.model';
import { ThemeModalComponent } from '../theme-modal/theme-modal.component';
import { AlertModalComponent } from 'src/app/components/alert-modal/alert-modal.component';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.scss']
})
export class ThemeComponent {

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

  onDelete(): void {
    const dialogRef = this.dialog.open(AlertModalComponent, { data: { type: 'theme', name: this.theme.name[this.currentLang]}  });
    dialogRef.afterClosed().subscribe(res => {
      if (res === true){
        this.delete.emit(this.theme.id);
      }
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(ThemeModalComponent, { data: this.theme });

    dialogRef.afterClosed().subscribe(res => {
      if (res && res.data) {
        this.edit.emit(res.data);
      }
    });
  }
}
