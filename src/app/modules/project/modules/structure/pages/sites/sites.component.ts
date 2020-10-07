import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Entity } from 'src/app/models/entity.model';
import { Group } from 'src/app/models/group.model';
import { Project } from 'src/app/models/project.model';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-sites',
  templateUrl: './sites.component.html',
  styleUrls: ['./sites.component.scss']
})
export class SitesComponent implements OnInit {

  project: Project;

  form: FormGroup;

  sitesDisplayedColumns: string[] = ['position', 'name', 'startDate', 'endDate', 'delete'];

  groupsDisplayedColumns: string[] = ['position', 'name', 'sites', 'delete'];

  sitesDataSource = new MatTableDataSource<AbstractControl>();
  groupsDataSource = new MatTableDataSource<AbstractControl>();

  constructor(
    private projectService: ProjectService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.projectService.openedProject.subscribe((project: Project) => {
      this.project = project;
      this.form = this.fb.group({
        sites: this.fb.array(this.project.entities.map(x => this.createSite(x))),
        groups: this.fb.array(this.project.groups.map(x => this.createGroup(x)))
      });

      this.sitesDataSource.data = this.sites.controls;
      this.groupsDataSource.data = this.groups.controls;
    });
  }

  get sites() {
    return this.form.get('sites') as FormArray;
  }

  get groups() {
    return this.form.get('groups') as FormArray;
  }

  public onChange(){
    console.log('mudou');
    this.project.entities = this.convertToEntity(this.sites.controls);
    this.project.groups = this.convertToGroup(this.groups.controls);
    this.projectService.alterProject(this.project);
  }

  private convertToEntity(input: any): Entity[]{
    const myEntities = [];
    for (const element of input){
      myEntities.push( new Entity({
        name: element.controls.name.value,
        start: element.controls.startDate.value,
        end: element.controls.endDate.value,
      }));
    }
    return myEntities;
  }

  private convertToGroup(input: any): Group[] {
    const myGroups = [];
    for (const element of input){
      console.log(new Group(element.value));
      myGroups.push( new Group(element.value) );
    }
    return myGroups;
  }

  public addSite() {
    this.sites.push(this.createSite());
    this.sitesDataSource.data = this.sites.controls;
    this.project.entities = this.convertToEntity(this.sites.controls);
    this.projectService.alterProject(this.project);
  }

  public removeSite(index: number) {
    this.sites.removeAt(index);
    this.sitesDataSource.data = this.sites.controls;
    this.project.entities = this.convertToEntity(this.sites.controls);
    this.projectService.alterProject(this.project);
  }

  public addGroup() {
    this.groups.push(this.createGroup());
    this.groupsDataSource.data = this.groups.controls;
    // this.project.groups = this.convertToGroup(this.groups.controls);
    // this.projectService.alterProject(this.project);
  }

  public removeGroup(index: number) {
    this.groups.removeAt(index);
    this.groupsDataSource.data = this.groups.controls;
  }

  private createSite(entity?: Entity): FormGroup {
    return this.fb.group({
      name: [entity ? entity.name : '', Validators.required],
      startDate: [entity ? entity.start : new Date(), Validators.required],
      endDate: [entity ? entity.end : new Date(), Validators.required],
    });
  }

  private createGroup(group?: Group): FormGroup {
    return this.fb.group({
      name: [ group ? group.name : '', Validators.required],
      members: [group ? group.members : '']
    });
  }

}
