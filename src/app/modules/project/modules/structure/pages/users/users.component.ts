import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/modules/parameters/models/user';
import { MatDialog } from '@angular/material/dialog';
import { UserModalComponent } from './components/user-modal/user-modal.component';
import { usersList } from './constants/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: User[];

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    this.users = usersList;
  }

  openDialog() {
    const dialogRef = this.dialog.open(UserModalComponent);

    dialogRef.afterClosed().subscribe(res => {
      console.log('dialog closed.');
    });
  }

}
