import { Component, Inject, OnInit } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {

  public warning: boolean;

  constructor(
    private userService: UserService,
    public dialogRef: MatDialogRef<ConfirmModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){}

  ngOnInit(): void {
    this.warning = this.data.warning;
  }

  userAgreement(event): void {
    this.userService.updateInputModalChoice(!event.checked);
  }

  confirm(){
    this.dialogRef.close({ confirm: true });
  }
  cancel(){
    this.dialogRef.close({ confirm: false});
  }



}
