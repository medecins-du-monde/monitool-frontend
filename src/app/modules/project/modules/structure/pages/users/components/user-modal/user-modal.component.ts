import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { rolesList } from '../../constants/role';
import { typesList } from '../../constants/type';
import { User } from 'src/app/models/classes/user.model';
import { UserService } from 'src/app/services/user.service';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from 'src/app/models/classes/project.model';
import { Entity } from 'src/app/models/classes/entity.model';
import { Form } from 'src/app/models/classes/form.model';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss']
})
export class UserModalComponent implements OnInit {

  userForm: FormGroup;

  users: any[];
  types: any[];
  roles: any[];
  project: Project;
  dataSources: Form[];
  collectionSites: Entity[];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<UserModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    private userService: UserService,
    private projectService: ProjectService
  ) { }

  get selectedSites() {
    return this.userForm ? this.collectionSites.filter(x => this.userForm.controls.entities.value.includes(x)) : [];
  }

  get selectedDataSources(){
    return this.userForm ? this.dataSources.filter(x => this.userForm.controls.dataSources.value.includes(x)) : [];
  }

  ngOnInit(): void {
    this.types = typesList;
    this.roles = rolesList;
    this.projectService.openedProject.subscribe(project => {
      this.project = project;
      this.collectionSites = project.entities;
      this.dataSources = project.forms;

      this.resetChanges();

    });

    this.userService.list().then( users => {
      this.users = users;
    });
  }

  onSubmit() {
    const user = new User(this.userForm.value);
    this.dialogRef.close({ data: user });
  }

  resetChanges(){
    this.userForm = this.fb.group({
      id: [ (this.data ? this.data.id : null), Validators.required ],
      role: [ (this.data ? this.data.role : null), Validators.required ],
      type: [ (this.data ? this.data.type : this.types[0].value), Validators.required ],
      entities: [ ((this.data && this.data.entities) ? this.data.entities : []), Validators.required ],
      dataSources: [ ((this.data && this.data.dataSources) ? this.data.dataSources : []), Validators.required ],
      name: [ this.data ? this.data.name : null, Validators.required ],
      username: [ this.data ? this.data.username : null, Validators.required ],
      password: [ this.data ? this.data.password : null, Validators.required ]
    });
  }

  onSiteRemoved(site: Entity) {
    const sites = this.userForm.controls.entities.value;
    this.userForm.controls.entities.setValue(sites.filter(s => s.id !== site.id));
  }

  onDataSourceRemoved(dataSource: Form) {
    const dataSources = this.userForm.controls.dataSources.value;
    this.userForm.controls.dataSources.setValue(dataSources.filter(d => d.id !== dataSource.id));
  }

}
