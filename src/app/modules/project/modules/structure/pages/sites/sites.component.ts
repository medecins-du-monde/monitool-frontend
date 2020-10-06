import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

export interface CollectionSite {
  name: string;
  startDate: Date;
  endDate: Date;
}

export interface Group {
  name: string;
  sites: CollectionSite[];
}

@Component({
  selector: 'app-sites',
  templateUrl: './sites.component.html',
  styleUrls: ['./sites.component.scss']
})
export class SitesComponent implements OnInit {
  form: FormGroup;

  sitesDisplayedColumns: string[] = ['position', 'name', 'startDate', 'endDate', 'delete'];

  groupsDisplayedColumns: string[] = ['position', 'name', 'sites', 'delete'];

  constructor(private fb: FormBuilder) { }


  ngOnInit(): void {
    const sites = [
      {
        name: 'Site 1',
        startDate: new Date(),
        endDate: new Date()
      },
      {
        name: 'Site 2',
        startDate: new Date(),
        endDate: new Date()
      }
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

  private createSite(site?: CollectionSite): FormGroup {
    return this.fb.group({
      name: [site ? site.name : '', Validators.required],
      startDate: [site ? site.startDate : new Date(), Validators.required],
      endDate: [site ? site.endDate : new Date(), Validators.required],
    });
  }

  private createGroup(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      sites: ['']
    });
  }


}
