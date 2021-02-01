import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { Entity } from 'src/app/models/classes/entity.model';
import { Group } from 'src/app/models/classes/group.model';
import { Project } from 'src/app/models/classes/project.model';
import { ProjectService } from 'src/app/services/project.service';
import FormGroupBuilder from 'src/app/utils/form-group-builder';




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

  get entities(): FormArray {
    return this.sitesForm.get('entities') as FormArray;
  }

  groupsDisplayedColumns: string[] = ['position', 'name', 'sites', 'delete'];

  groupsDataSource = new MatTableDataSource<AbstractControl>();

  get groups(): FormArray {
    return this.sitesForm.get('groups') as FormArray;
  }

  get selectedEntities(): FormArray {
    return this.groups.value.map(x => {
      return this.entities.value.filter(e => x.members.includes(e.id));
    });
  }

  private subscription: Subscription = new Subscription();

  constructor(
    private projectService: ProjectService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.subscription.add(
      this.projectService.openedProject.subscribe((project: Project) => {
        if (!this.project || project.id !== this.project.id || project.rev !== this.project.rev || !project.parsed) {
          this.project = project;
          project.parsed = true; 
          this.sitesForm = this.fb.group({
            entities: this.fb.array(this.project.entities.map(x => FormGroupBuilder.newEntity(project, x))),
            groups: this.fb.array(this.project.groups.map(x => FormGroupBuilder.newEntityGroup(x)))
          });
          this.entitiesDataSource.data = this.entities.controls;
          this.groupsDataSource.data = this.groups.controls;
          this.sitesForm.valueChanges.subscribe((value: any) => {
            value.entities = value.entities.map(x => new Entity(x));
            const groups = [];
            value.groups.forEach(x => {
              const group = new Group(x);
              const members = x.members;
              group.members = value.entities.filter(e => members.includes(e.id));
              groups.push(group);
            });
            value.groups = groups;
            this.projectService.valid = this.sitesForm.valid;
            this.projectService.project.next(Object.assign(project, value));
          });
        }
      })
    );
  }

  public onAddNewEntity(): void {
    this.entities.push(FormGroupBuilder.newEntity(this.project));
    this.entitiesDataSource.data = this.entities.controls;
  }

  public onRemoveEntity(index: number): void {
    this.entities.removeAt(index);
    this.entitiesDataSource.data = this.entities.controls;
  }

  onEntityRemoved(index: number, id: number): void {
    const group = this.groups.controls[index] as FormGroup;
    const members = group.controls.members;
    members.setValue(members.value.filter(x => x !== id));
  }

  public onAddNewGroup(): void {
    this.groups.push(FormGroupBuilder.newEntityGroup());
    this.groupsDataSource.data = this.groups.controls;
  }

  public onRemoveGroup(index: number): void {
    this.groups.removeAt(index);
    this.groupsDataSource.data = this.groups.controls;
  }
}
