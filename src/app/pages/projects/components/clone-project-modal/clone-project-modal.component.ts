import { Component, OnInit } from '@angular/core';
import { CloneProjectModalModule } from './clone-project-modal.module';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-clone-project-modal',
  templateUrl: './clone-project-modal.component.html',
  styleUrls: ['./clone-project-modal.component.scss']
})
export class CloneProjectModalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CloneProjectModalModule>
  ) { }

  ngOnInit(): void {
  }

  onSubmit(){
    this.dialogRef.close(true);
  }



}
