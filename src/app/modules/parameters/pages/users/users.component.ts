import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: User[];

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  private getUsers() {
    this.userService.list().then((res: User[]) => {
      this.users = res;
    });
  }

  onEdit(user: User) {
    this.userService.save(user).then(() => this.getUsers());
  }
}
