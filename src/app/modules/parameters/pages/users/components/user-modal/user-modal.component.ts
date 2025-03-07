import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { HintUserData } from 'src/app/mocked/hint-user-element.mocked';
import { User } from 'src/app/models/classes/user.model';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss']
})
export class UserModalComponent implements OnInit {

  userForm: UntypedFormGroup;

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

  panelOpenState = false;
  displayedColumns: string[] = ['untitled', 'admin', 'project', 'common'];
  dataSource = HintUserData;

  constructor(
    private fb: UntypedFormBuilder,
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
