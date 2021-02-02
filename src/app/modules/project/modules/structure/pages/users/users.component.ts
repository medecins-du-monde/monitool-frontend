import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserModalComponent } from './components/user-modal/user-modal.component';
import { Subscription } from 'rxjs';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from 'src/app/models/classes/project.model';
import { User } from 'src/app/models/classes/user.model';
import UsersHelper from 'src/app/utils/users.helper';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  private subscription: Subscription = new Subscription();

  users: User[];
  project: Project;

  constructor(
    private dialog: MatDialog,
    private projectService: ProjectService
  ) { }

  ngOnInit(): void {
    this.users = [];

    this.subscription.add(
      this.projectService.openedProject.subscribe((project: Project) => {
        this.project = project;
        this.users = this.project.users;
      })
    );
  }

  onDelete(id: string) {
    const oldUserIndex = this.project.users.findIndex(u => u.id === id);
    this.project.users.splice(oldUserIndex, 1);
    this.projectService.project.next(this.project);
  }

  onEdit(user: User) {
    let oldUserIndex = null;
    if (user.type === 'internal'){
      oldUserIndex = this.project.users.findIndex(u => u.id === user.id);
    }
    else {
      oldUserIndex = this.project.users.findIndex(u => u.username === user.username);
    }
    this.project.users[oldUserIndex] = user;
    this.projectService.project.next(this.project);
  }
  openDialog() {
    const dialogRef = this.dialog.open(UserModalComponent);

    dialogRef.afterClosed().subscribe(res => {
      if (res && res.data){
        if(['internal', 'partner'].includes(res.data.type)){
          if((UsersHelper.isInternal(res.data) || UsersHelper.isPartner(res.data)) && (UsersHelper.isNull(res.data) == false)){
            this.project.users.push(res.data);
            this.projectService.project.next(this.project);
          }
        }
      }
    });
  }

}
