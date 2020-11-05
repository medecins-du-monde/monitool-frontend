import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserModalComponent } from '../user-modal/user-modal.component';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { rolesList } from '../../constants/role';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  @Input() user: User;
  @Output() delete = new EventEmitter();
  @Output() edit = new EventEmitter();

  MDMusers: User[];

  constructor(
    private dialog: MatDialog,
    private userService: UserService
  ) { }

  get login(){
    if (this.user.id){
      return this.user.id.split(':')[1];
    }
  }

  get role(){
    return rolesList.find(x => x.value === this.user.role).name;
  }

  get name(){
    if (this.MDMusers){
      return this.MDMusers.find(x => x.id === this.user.id).name;
    }
    return '';
  }

  ngOnInit(): void {
    this.userService.list().then( users => {
      this.MDMusers = users;
    });
  }

  onDelete(): void {
    this.delete.emit(this.user.id);
  }

  openDialog() {
    const dialogRef = this.dialog.open(UserModalComponent, { data : this.user });

    dialogRef.afterClosed().subscribe(res => {
      if (res && res.data) {
        this.edit.emit(res.data);
      }
    });
  }

}
