import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Entity } from 'src/app/models/entity.model';
import { Group } from 'src/app/models/group.model';
import { Project } from 'src/app/models/project.model';
import { ProjectService } from 'src/app/services/project.service';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-sites',
  templateUrl: './sites.component.html',
  styleUrls: ['./sites.component.scss']
})
export class SitesComponent implements OnInit {

  project: Project;

  sitesForm: FormGroup;

  entitiesDisplayedColumns: string[] = ['position', 'name', 'start', 'end', 'delete'];

  entitiesDataSource = new MatTableDataSource<AbstractControl>();

  get entities() {
    return this.sitesForm.get('entities') as FormArray;
  }

  groupsDisplayedColumns: string[] = ['position', 'name', 'sites', 'delete'];

  groupsDataSource = new MatTableDataSource<AbstractControl>();

  get groups() {
    return this.sitesForm.get('groups') as FormArray;
  }

  private subscription: Subscription = new Subscription();

  constructor(
    private projectService: ProjectService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.subscription.add(
      this.projectService.openedProject.subscribe((project: Project) => {
        this.project = project;
        this.sitesForm = this.fb.group({
          entities: this.fb.array(this.project.entities.map(x => this.newEntity(x))),
          groups: this.fb.array(this.project.groups.map(x => this.newGroup(x)))
        });
        this.entitiesDataSource.data = this.entities.controls;
        this.groupsDataSource.data = this.groups.controls;
      })
    );
  }

  private convertToEntity(input: any): Entity[] {
    const myEntities = [];
    for (const element of input) {
      myEntities.push(new Entity({
        id: element.controls.id.value,
        name: element.controls.name.value,
        start: element.controls.start.value,
        end: element.controls.end.value,
      }));
    }
    return myEntities;
  }

  private convertToGroup(input: any): Group[] {
    const myGroups = [];
    for (const element of input) {
      myGroups.push(new Group({
        name: element.value.name,
        members: element.value.members.map(x => {
          for (const entity of this.project.entities) {
            if (x === entity.id) {
              return entity;
            }
          }
          return x;
        })
      }));
    }
    return myGroups;
  }

  public onChange() {
    this.project.entities = this.convertToEntity(this.entities.controls);
    this.project.groups = this.convertToGroup(this.groups.controls);
    this.projectService.project.next(this.project);
  }

  public onSelectionChange() {
    this.project.groups = this.convertToGroup(this.groups.controls);
    this.projectService.project.next(this.project);
  }

  public onAddNewEntity() {
    this.entities.push(this.newEntity());
    this.project.groups = this.convertToGroup(this.groups.controls);
    this.project.entities = this.convertToEntity(this.entities.controls);
    this.projectService.project.next(this.project);
  }

  private newEntity(entity?: Entity): FormGroup {
    if (!entity) {
      entity = new Entity();
    }
    return this.fb.group({
      id: [entity.id, Validators.required],
      name: [entity.name, Validators.required],
      start: [entity.start],
      end: [entity.end]
    });
  }

  public onRemoveEntity(index: number) {
    this.entities.removeAt(index);
    this.project.groups = this.convertToGroup(this.groups.controls);
    this.project.entities = this.convertToEntity(this.entities.controls);
    this.projectService.project.next(this.project);
  }

  public onAddNewGroup() {
    this.groups.push(this.newGroup());
    this.project.groups = this.convertToGroup(this.groups.controls);
    this.project.entities = this.convertToEntity(this.entities.controls);
    this.projectService.project.next(this.project);
  }

  private newGroup(group?: Group): FormGroup {
    if (!group) {
      group = new Group();
    }
    return this.fb.group({
      name: [group.name, Validators.required],
      members: [group.members.map(x => x.id)]
    });
  }

  public onRemoveGroup(index: number) {
    this.groups.removeAt(index);
    this.project.groups = this.convertToGroup(this.groups.controls);
    this.project.entities = this.convertToEntity(this.entities.controls);
    this.projectService.project.next(this.project);
  }
}
