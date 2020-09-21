import { Component, OnInit } from '@angular/core';
import { usersList } from 'src/app/modules/parameters/constants/users';
import { User } from 'src/app/modules/parameters/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: User[];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.list();
    this.users = usersList;
  }

}
