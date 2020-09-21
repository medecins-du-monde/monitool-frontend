import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Theme } from 'src/app/models/theme.model';
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

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {}

  onDelete(): void {
    this.delete.emit(this.theme.id);
  }

  openDialog() {
    const dialogRef = this.dialog.open(ThemeModalComponent, { data: this.theme });

    dialogRef.afterClosed().subscribe(res => {
      if (res && res.data) {
        this.edit.emit(res.data);
      }
    });
  }
}
