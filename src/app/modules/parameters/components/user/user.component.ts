import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../models/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  @Input() user: User;
  login: string;
  role: string;

  constructor() {
  }

  ngOnInit(): void {
    this.login = this.user._id.split(':')[1];
    this.user.role === 'admin' ? this.role = 'Administrateur' : this.role = 'Standard';
  }

}
