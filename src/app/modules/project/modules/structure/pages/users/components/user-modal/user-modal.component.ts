import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { rolesList } from '../../constants/role';
import { typesList } from '../../constants/type';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss']
})
export class UserModalComponent implements OnInit {

  userForm: FormGroup;

  users: any[];
  types: any[];
  roles: any[];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<UserModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      id: [ (this.data ? this.data.id : null), Validators.required ],
      role: [ (this.data ? this.data.role : null), Validators.required ],
      type: [ (this.data ? this.data.type : null), Validators.required ],
      name: this.data ? this.data.name : null,
      username: this.data ? this.data.username : null,
      password: this.data ? this.data.password : null,
    });

    this.userService.list().then( users => {
      this.users = users;
    });

    this.types = typesList;
    this.roles = rolesList;
  }

  onSubmit() {
    const user = new User(this.userForm.value);
    this.dialogRef.close({ data: user });
  }

}
