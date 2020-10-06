import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Entity } from 'src/app/models/entity.model';
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

  constructor(
    private projectService: ProjectService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.projectService.openedProject.subscribe((project: Project) => {
      this.project = project;
    });
    const sites = [
      new Entity({
        name: 'Site 1',
        start: new Date(),
        end: new Date()
      }),
      new Entity({
        name: 'Site 2',
        start: new Date(),
        end: new Date()
      })
    ];

    this.form = this.fb.group({
      sites: this.fb.array(sites.map(x => this.createSite(x))),
      groups: this.fb.array([this.createGroup()])
    });
  }

  get sites() {
    return this.form.get('sites') as FormArray;
  }

  get groups() {
    return this.form.get('groups') as FormArray;
  }

  public addSite() {
    this.sites.push(this.createSite());
  }

  public removeSite(index: number) {
    this.sites.removeAt(index);
  }

  public addGroup() {
    this.groups.push(this.createGroup());
  }

  public removeGroup(index: number) {
    this.groups.removeAt(index);
  }

  private createSite(entity?: Entity): FormGroup {
    return this.fb.group({
      name: [entity ? entity.name : '', Validators.required],
      startDate: [entity ? entity.start : new Date(), Validators.required],
      endDate: [entity ? entity.end : new Date(), Validators.required],
    });
  }

  private createGroup(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      sites: ['']
    });
  }

}
