import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss']
})
export class UserModalComponent implements OnInit {

  userForm: FormGroup;

  public roles = [
    {
      value: 'admin',
      display: 'AdminRole'
    },
    {
      value: 'project',
      display: 'ProjectRole'
    },
    {
      value: 'common',
      display: 'CommonRole'
    }
  ];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<UserModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User
  ) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      _id: [{ value: this.data.id, disabled: true }],
      _rev: [{ value: this.data.rev, disabled: true }],
      email: [{ value: this.data.email, disabled: true }],
      name: [{ value: this.data.name, disabled: true }],
      role: [this.data.role, Validators.required]
    }
    );
  }
  onSubmit() {
    const user = this.data;
    Object.assign(user, this.userForm.value);
    this.dialogRef.close({ data: user });
  }
}
