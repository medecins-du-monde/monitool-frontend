import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserModalComponent } from '../user-modal/user-modal.component';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/classes/user.model';
import { rolesList } from '../../constants/role';
import { Project } from 'src/app/models/classes/project.model';
import { Group } from 'src/app/models/classes/group.model';
import { Entity } from 'src/app/models/classes/entity.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  @Input() user: User;
  @Input() project: Project;
  @Output() delete = new EventEmitter();
  @Output() edit = new EventEmitter();
  public allOption: Group = new Group({id: 'all', name: 'All'});

  MDMusers: User[];
  groups: Group[];
  entities: any;
  dataSources: any;

  constructor(
    private dialog: MatDialog,
    private userService: UserService
  ) { }

  get login(){
    if (this.user.type === 'internal'){
      if (this.user.id){
        return this.user.id.split(':')[1];
      }
    }
    else {
      return this.user.username;
    }

    return '';
  }

  get role(){
    return rolesList.find(x => x.value === this.user.role).name;
  }

  get name(){
    if (this.user.type === 'internal' && this.MDMusers){
      return this.MDMusers.find(x => x.id === this.user.id).name;
    }
    if (this.user.type === 'partner'){
      return this.user.name;
    }
    return '';
  }


  private getGroupsSelected(){
    if (!this.user || !this.user.entities){
      return [];
    }

    console.log(this.user)
    // if all entities are selected, just return the allOption
    if (this.user.entities.length === this.project.entities.length){
      return [this.allOption];
    }

    // get the groups that have all members selected
    const groups = this.project.groups.filter(g => {
      for (const member of g.members){
        if (!this.user.entities.includes(member) ){
          return false;
        }
      }
      return true;
    });

    return groups;
  }
  
  private filterEntities(): Entity[] {
    let entities = [...this.user.entities];

    for (const group of this.groups){
      entities = entities.filter( e => !group.members.includes(e) );
    }

    return entities;
  }

  getDataSourcesSelected(){
    if (!this.user || !this.user.dataSources){
      return [];
    }

    if (this.user.dataSources.length === this.project.entities.length){
      return [this.allOption];
    }
    return this.user.dataSources;
  }

  ngOnInit(): void {
    this.userService.list().then( users => {
      this.MDMusers = users;
    });

    if (this.user.role === 'input'){
      this.groups = this.getGroupsSelected();
      this.entities = this.filterEntities();
      this.dataSources = this.getDataSourcesSelected();
    }
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
