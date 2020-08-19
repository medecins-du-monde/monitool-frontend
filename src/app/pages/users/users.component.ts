import { Component, OnInit } from '@angular/core';
import { usersList } from 'src/app/constants/users';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: User[];

  constructor() { }

  ngOnInit(): void {
    this.users = usersList;
  }

}
