import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/classes/user.model';
import { UserService } from 'src/app/services/user.service';
import { usersList2 } from 'src/app/mocked/users.mocked';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: User[];
  // temporary data
  users_data = usersList2;

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
