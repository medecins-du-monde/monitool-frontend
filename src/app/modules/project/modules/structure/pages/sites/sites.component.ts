import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Entity } from 'src/app/models/classes/entity.model';
import { Group } from 'src/app/models/classes/group.model';
import { Project } from 'src/app/models/classes/project.model';
import { ProjectService } from 'src/app/services/project.service';
import { Subscription } from 'rxjs';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MY_DATE_FORMATS } from 'src/app/utils/format-datepicker-helper';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import { DateService} from 'src/app/services/date.service';

@Component({
  selector: 'app-sites',
  templateUrl: './sites.component.html',
  styleUrls: ['./sites.component.scss'],
  providers: [
    {
      provide: DateAdapter, useClass: MomentDateAdapter,
      deps: [
        MAT_DATE_LOCALE, 
        MAT_MOMENT_DATE_ADAPTER_OPTIONS
      ]
    },
    {
      provide: MAT_DATE_FORMATS, 
      useValue: MY_DATE_FORMATS
    }
  ]
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

  get selectedEntities() {
    return this.groups.value.map(x => {
      return this.entities.value.filter(e => x.members.includes(e.id));
    });
  }

  private subscription: Subscription = new Subscription();

  constructor(
    private projectService: ProjectService,
    private fb: FormBuilder,
    private adapter: DateAdapter<any>,
    private dateService: DateService,
  ) { }

  ngOnInit(): void {
    this.subscription.add(
      this.projectService.openedProject.subscribe((project: Project) => {
        if (!this.project || project.id !== this.project.id || project.rev !== this.project.rev) {
          this.project = project;
          this.sitesForm = this.fb.group({
            entities: this.fb.array(this.project.entities.map(x => this.newEntity(x))),
            groups: this.fb.array(this.project.groups.map(x => this.newGroup(x)))
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
            this.projectService.project.next(Object.assign(project, value));
          });
        }
      })
    );

    this.dateService.langValueObs$.subscribe(
      lang=>{
        this.adapter.setLocale(lang);
      }
    );
  }

  public onAddNewEntity() {
    this.entities.push(this.newEntity());
    this.entitiesDataSource.data = this.entities.controls;
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
    this.entitiesDataSource.data = this.entities.controls;
  }

  onEntityRemoved(index: number, id: number) {
    const group = this.groups.controls[index] as FormGroup;
    const members = group.controls.members;
    members.setValue(members.value.filter(x => x !== id));
  }

  public onAddNewGroup() {
    this.groups.push(this.newGroup());
    this.groupsDataSource.data = this.groups.controls;
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
    this.groupsDataSource.data = this.groups.controls;
  }
}
