import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Entity } from 'src/app/models/entity.model';
import { Group } from 'src/app/models/group.model';
import { Project } from 'src/app/models/project.model';
import { ProjectService } from 'src/app/services/project.service';
import { IfStmt } from '@angular/compiler';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-sites',
  templateUrl: './sites.component.html',
  styleUrls: ['./sites.component.scss']
})
export class SitesComponent implements OnInit {

  project: Project;

  form: FormGroup;

  sitesDisplayedColumns: string[] = ['position', 'name', 'start', 'end', 'delete'];

  groupsDisplayedColumns: string[] = ['position', 'name', 'sites', 'delete'];

  private subscription: Subscription = new Subscription();

  sitesDataSource = new MatTableDataSource<AbstractControl>();
  groupsDataSource = new MatTableDataSource<AbstractControl>();

  constructor(
    private projectService: ProjectService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.subscription.add(
      this.projectService.openedProject.subscribe((project: Project) => {
        this.project = project;

        this.form = this.fb.group({
          sites: this.fb.array(this.project.entities.map(x => this.createSite(x))),
          groups: this.fb.array(this.project.groups.map(x => this.createGroup(x)))
        });

        this.sitesDataSource.data = this.sites.controls;
        this.groupsDataSource.data = this.groups.controls;

      })
    );

  }

  get sites() {
    return this.form.get('sites') as FormArray;
  }

  get groups() {
    return this.form.get('groups') as FormArray;
  }

  private convertToEntity(input: any): Entity[]{
    const myEntities = [];
    for (const element of input){
      myEntities.push( new Entity({
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
    for (const element of input){
      myGroups.push( new Group({
        name: element.value.name,
        members: element.value.members.map(x => {
          for (const entity of this.project.entities){
            if (x === entity.id){
              return entity;
            }
          }
          return x;
        })
      }));
    }
    return myGroups;
  }

  public onChange(){
    this.project.entities = this.convertToEntity(this.sites.controls);
    this.project.groups = this.convertToGroup(this.groups.controls);
    this.projectService.alterProject(this.project);
  }
  public onSelectionChange(){
    this.project.groups = this.convertToGroup(this.groups.controls);
    this.projectService.alterProject(this.project);
  }

  public addSite() {
    this.sites.push(this.createSite());
    this.project.groups = this.convertToGroup(this.groups.controls);
    this.project.entities = this.convertToEntity(this.sites.controls);
    this.projectService.alterProject(this.project);
  }

  public removeSite(index: number) {
    const removedSite = this.sites.controls[index].value;
    console.log(removedSite);
    this.sites.removeAt(index);
    this.groups.controls = this.groups.controls.map(group => {
      const newGroup = group;
      newGroup.value.members = group.value.members.filter(x => x !== removedSite.id);
      return newGroup;
    });
    this.project.groups = this.convertToGroup(this.groups.controls);
    this.project.entities = this.convertToEntity(this.sites.controls);
    this.projectService.alterProject(this.project);
  }

  public addGroup() {
    this.groups.push(this.createGroup());
    this.project.groups = this.convertToGroup(this.groups.controls);
    this.project.entities = this.convertToEntity(this.sites.controls);
    this.projectService.alterProject(this.project);
  }

  public removeGroup(index: number) {
    this.groups.removeAt(index);
    this.project.groups = this.convertToGroup(this.groups.controls);
    this.project.entities = this.convertToEntity(this.sites.controls);
    this.projectService.alterProject(this.project);
  }

  private createSite(entity?: Entity): FormGroup {
    return this.fb.group({
      id: [entity ? entity.id : '', Validators.required],
      name: [entity ? entity.name : '', Validators.required],
      start: [entity ? entity.start : new Date(), Validators.required],
      end: [entity ? entity.end : new Date(), Validators.required],
    });
  }

  private createGroup(group?: Group): FormGroup {
    return this.fb.group({
      name: [ group ? group.name : '', Validators.required],
      members: [ group ? group.members.map(x => x.id) : []]
    });
  }

}
