import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserModalComponent } from './components/user-modal/user-modal.component';
import { Subscription } from 'rxjs';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from 'src/app/models/classes/project.model';
import { User } from 'src/app/models/classes/user.model';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import InformationItem from 'src/app/models/interfaces/information-item';
import BreadcrumbItem from 'src/app/models/interfaces/breadcrumb-item.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  informations = [
    {
      res1: 'InformationPanel.User_list',
      res2: 'InformationPanel.User_list_description'
    } as InformationItem,
    {
      res1: 'InformationPanel.General_Naming_convention_question',
      res2: 'InformationPanel.General_Naming_convention_response'
    } as InformationItem,
    {
      res1: 'InformationPanel.General_accidental_delete_question',
      res2: 'InformationPanel.General_accidental_delete_response'
    } as InformationItem,
    {
      res1: 'InformationPanel.General_delete_saved_question',
      res2: 'InformationPanel.General_delete_saved_response'
    } as InformationItem
  ]

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

        const breadCrumbs = [
          {
            value: 'Projects',
            link: './../../projects'
          } as BreadcrumbItem,
          {
            value: project.country,
          } as BreadcrumbItem,
          {
            value: project.name,
          } as BreadcrumbItem,
          {
            value: 'Structure',
          } as BreadcrumbItem,
          {
            value: 'Users',
          } as BreadcrumbItem,
        ];
        this.projectService.updateBreadCrumbs(breadCrumbs);
      })
    );
    this.projectService.updateInformationPanel(this.informations);
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
        this.project.users.push(res.data);
        this.projectService.project.next(this.project);
      }
    });
  }

  // drag and drop function on a list than can span accross multiple rows
  drop(event: CdkDragDrop<any>) {
    this.users[event.previousContainer.data.index] = event.container.data.user;
    this.users[event.container.data.index] = event.previousContainer.data.user;
    event.currentIndex = 0;
    this.projectService.project.next(this.project);
  }

}
