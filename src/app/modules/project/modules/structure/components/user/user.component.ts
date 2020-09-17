import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/modules/parameters/models/user';
import { MatDialog } from '@angular/material/dialog';
import { UserModalComponent } from '../user-modal/user-modal.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  @Input() user: User;
  login: string;
  role: string;

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    this.login = this.user._id.split(':')[1];
  }

  openDialog() {
    const dialogRef = this.dialog.open(UserModalComponent);

    dialogRef.afterClosed().subscribe(res => {
      console.log('dialog closed.');
    });
  }

}
