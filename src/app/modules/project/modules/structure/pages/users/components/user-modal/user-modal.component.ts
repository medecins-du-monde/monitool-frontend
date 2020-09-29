import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/modules/parameters/models/user';
import { usersList } from '../../constants/user';
import { typesList } from '../../constants/type';
import { rolesList } from '../../constants/role';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss']
})
export class UserModalComponent implements OnInit {

  userForm: FormGroup;

  users: User[];
  types: any[];
  roles: any[];

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.users = usersList;
    this.types = typesList;
    this.roles = rolesList;
    this.userForm = this.fb.group({
      type: ['', Validators.required],
      user: ['', Validators.required],
      role: ['', Validators.required]
    });
  }

}
