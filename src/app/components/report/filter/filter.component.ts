import { Component, OnInit, EventEmitter, Output, Input} from '@angular/core';
import {  FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Project } from 'src/app/models/project.model';
import { ProjectService } from 'src/app/services/project.service';
import { Entity } from 'src/app/models/entity.model';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit{

  collapsed = true;

  selectedSites = [];

  endDate: Date;
  startDate: Date;

  sites: Entity[];
  filterForm: FormGroup;

  @Output() filterEvent: EventEmitter<object> = new EventEmitter<object>();
  project: Project;

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService
  ) { }

  onEntityRemoved(entity) {
    this.selectedSites = this.selectedSites.filter(site => site.id !== entity.id);
    this.filterForm.get('entity').setValue(this.selectedSites.map(x => x.id));
  }

  toggleCollapsed() {
    this.collapsed = this.collapsed ? false : true;
  }

  ngOnInit(): void {
    this.projectService.openedProject.subscribe((project: Project) => {
      this.project = project;

      this.sites = this.project.entities;

      this.filterForm = this.fb.group({
        _start: [this.project.start, Validators.required],
        _end: [this.project.end, Validators.required ],
        entity: [ this.project.entities.map(x => x.id), Validators.required]
      });

      this.filterEvent.emit(this.filterForm.value);

      this.selectedSites = this.project.entities.map(entity => entity);

      this.filterForm.valueChanges.subscribe(value => {
        this.selectedSites = this.sites.filter( site => value.entity.includes(site.id) );
        this.filterEvent.emit(value);
      });
    });
  }
}
