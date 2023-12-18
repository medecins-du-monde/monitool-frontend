import { Component, Input, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/models/classes/user.model';
import { UserModalComponent } from '../user-modal/user-modal.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  @Input() user: User;

  @Output() edit = new EventEmitter();
  @Output() delete = new EventEmitter<User>();
  @Output() restore = new EventEmitter<User>();

  constructor(private dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(UserModalComponent, { data: this.user });

    const dialogSubscription = dialogRef.afterClosed().subscribe(res => {
      if (res && res.data) {
        this.edit.emit(res.data);
        dialogSubscription.unsubscribe();
      }
    });
  }

  onDelete(): void {
    this.user.active = false;
    this.delete.emit(this.user);
  }

  onRestore(): void {
    this.user.active = true;
    this.restore.emit(this.user);
  }
}
