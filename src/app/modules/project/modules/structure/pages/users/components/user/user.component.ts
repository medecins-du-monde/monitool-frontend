import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { UserModalComponent } from '../user-modal/user-modal.component';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/classes/user.model';
import { rolesList } from '../../constants/role';
import { Project } from 'src/app/models/classes/project.model';
import { Group } from 'src/app/models/classes/group.model';
import { Entity } from 'src/app/models/classes/entity.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {

  @Input() user: User;
  @Input() project: Project;
  @Output() delete = new EventEmitter();
  @Output() edit = new EventEmitter();
  public allOption: Group = new Group({id: 'all', name: 'All'});

  MDMusers: User[];
  groups: Group[];
  entities: any[] = [];
  dataSources: any = {};

  subscriptions: Subscription[] = [];

  constructor(
    private dialog: MatDialog,
    private userService: UserService
  ) { }

  get login(): string{
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

  get role(): string{
    return rolesList.find(x => x.value === this.user.role)?.name || '';
  }

  get name(): string{
    if (this.user.type === 'internal' && this.MDMusers){
      return this.MDMusers.find(x => x.id === this.user.id)?.name || '';
    }
    if (this.user.type === 'partner'){
      return this.user.name;
    }
    return '';
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.userService.userList.subscribe((users: User[]) => {
        this.MDMusers = users;
      })
    );

    if (this.user.role === 'input'){
      this.groups = this.getGroupsSelected();
      this.entities = this.filterEntities();
      this.dataSources = this.getDataSourcesSelected();
    }
  }

  private getGroupsSelected(){
    if (!this.user || !this.user.entities){
      return [];
    }
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

  onDelete(): void {
    this.delete.emit(this.user);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(UserModalComponent, { data : this.user });

    const dialogSubscription = dialogRef.afterClosed().subscribe(res => {
      if (res && res.data) {
        this.edit.emit(res.data);
        dialogSubscription.unsubscribe();
      }
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.map(subscription => subscription.unsubscribe());
  }
}
