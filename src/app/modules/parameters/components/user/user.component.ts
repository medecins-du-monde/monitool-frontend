import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/models/user.model';
import { UserModalComponent } from '../user-modal/user-modal.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  @Input() user: User;

  @Output() edit = new EventEmitter();

  constructor(private dialog: MatDialog) {
  }

  ngOnInit(): void {}

  openDialog() {
    const dialogRef = this.dialog.open(UserModalComponent, { data: this.user });

    dialogRef.afterClosed().subscribe(res => {
      if (res && res.data) {
        this.edit.emit(res.data);
      }
    });
  }

}
