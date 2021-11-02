import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {

  public warning: boolean;

  constructor(
    public dialogRef: MatDialogRef<ConfirmModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any 
  ){}

  ngOnInit(): void {
    if (this.data.messageId === 'DelayWarning') {
      this.warning = true;
    } else {
      this.warning = false;
    }
  }

  confirm(){
    this.dialogRef.close({ confirm: true });
  }
  cancel(){
    this.dialogRef.close({ confirm: false});
  }



}
