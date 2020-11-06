import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserModalComponent } from './components/user-modal/user-modal.component';
import { Subscription } from 'rxjs';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from 'src/app/models/project.model';
import { User } from 'src/app/models/user.model';

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
    console.log(this.project.users);
    this.projectService.project.next(this.project);
  }

  onEdit(user: User) {
    const oldUserIndex = this.project.users.findIndex(u => u.id === user.id);
    this.project.users[oldUserIndex] = user;
    console.log(this.project.users);
    this.projectService.project.next(this.project);
  }
  openDialog() {
    const dialogRef = this.dialog.open(UserModalComponent);

    dialogRef.afterClosed().subscribe(res => {
      if (res && res.data){
        this.project.users.push(res.data);
        console.log(this.project);
        this.projectService.project.next(this.project);
      }
    });
  }

}
