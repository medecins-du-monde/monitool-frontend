import { AfterViewChecked, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Entity } from 'src/app/models/classes/entity.model';
import { Form } from 'src/app/models/classes/form.model';
import { Group } from 'src/app/models/classes/group.model';
import { Project } from 'src/app/models/classes/project.model';
import { User } from 'src/app/models/classes/user.model';
import { ProjectService } from 'src/app/services/project.service';
import { UserService } from 'src/app/services/user.service';
import { rolesList } from '../../constants/role';
import { typesList } from '../../constants/type';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss']
})
export class UserModalComponent implements OnInit, AfterViewChecked {

  userForm: FormGroup;

  users: User[];
  types: any[];
  roles: any[];
  project: Project;
  dataSources: Form[];
  entities: Entity[];
  groups: Group[];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<UserModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    private userService: UserService,
    private projectService: ProjectService,
    private changeDetectorRef: ChangeDetectorRef,
  ) { }

  get selectedSites(): Entity[] {
    return this.userForm ? this.entities.filter(x => this.userForm.controls.entities.value.includes(x)) : [];
  }

  get selectedDataSources(): Form[] {
    return this.userForm ? this.dataSources.filter(x => this.userForm.controls.dataSources.value.includes(x)) : [];
  }

  get disableButton(): boolean {
    return !this.userForm?.valid;
  }

  ngOnInit(): void {
    this.types = typesList;
    this.roles = rolesList;
    this.projectService.openedProject.subscribe(project => {
      this.project = project;
      this.entities = project.entities;
      this.groups = project.groups;
      this.dataSources = project.forms;

      this.resetChanges();

    });

    this.userService.list().then((users: User[]) => {
      this.users = users;
    });

    this.userForm.valueChanges.subscribe(() => {
      if (this.userForm.value.type && this.userForm.value.type === 'partner') {
        this.userForm.controls['name'].setValidators([Validators.required]);
        this.userForm.controls['username'].setValidators([Validators.required]);
        this.userForm.controls['password'].setValidators([Validators.required]);
      } else {
        this.userForm.controls['name'].clearValidators();
        this.userForm.controls['username'].clearValidators();
        this.userForm.controls['password'].clearValidators();
      }
      if (this.userForm.value.role && this.userForm.value.role === 'input') {
        this.userForm.controls['dataSources'].setValidators([Validators.required]);
        this.userForm.controls['entities'].setValidators([Validators.required]);
      } else {
        this.userForm.controls['dataSources'].clearValidators();
        this.userForm.controls['entities'].clearValidators();
      }
    });

  }

  onSubmit(): void {
    const formValue = this.userForm.value;
    formValue.entities = formValue.entities.filter(e => this.entities.includes(e));
    formValue.dataSources = formValue.dataSources.filter(d => this.dataSources.includes(d));
    const user = new User(formValue);
    this.dialogRef.close({ data: user });
  }

  resetChanges(): void {
    this.userForm = this.fb.group({
      id: [(this.data ? this.data.id : null)],
      role: [(this.data ? this.data.role : null), Validators.required],
      type: [(this.data ? this.data.type : this.types[0].value), Validators.required],
      entities: [((this.data && this.data.entities) ? this.data.entities : [])],
      dataSources: [((this.data && this.data.dataSources) ? this.data.dataSources : [])],
      name: [this.data ? this.data.name : null],
      username: [this.data ? this.data.username : null],
      password: [this.data ? this.data.password : null]
    });
  }

  onSiteRemoved(site: Entity): void {
    const sites = this.userForm.controls.entities.value;
    this.userForm.controls.entities.setValue(sites.filter(s => s.id !== site.id));
  }

  onDataSourceRemoved(dataSource: Form): void {
    const dataSources = this.userForm.controls.dataSources.value;
    this.userForm.controls.dataSources.setValue(dataSources.filter(d => d.id !== dataSource.id));
  }

  ngAfterViewChecked(): void {
    this.changeDetectorRef.detectChanges();
  }

}
