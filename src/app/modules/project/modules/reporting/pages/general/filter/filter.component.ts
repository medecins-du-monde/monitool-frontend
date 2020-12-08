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

  // addSite(site){
  //   site.forEach(s => {
  //     const exists = this.selectedSites.some(element => element.id === s.id);
  //     if (!exists) {
  //       const tempSite = {id: s.id, name: s.name};
  //       this.selectedSites.push(tempSite);
  //     }
  //   });
  //   this.createFilter();
  // }

  // createFilter() {
  //   let filter = {};
  //   if (this.selectedSites.length > 0) {
  //     const entities = [];
  //     this.selectedSites.forEach(site => entities.push(site.id));
  //     filter =  {
  //               _start: this.transformDate(this.startDate),
  //               _end: this.transformDate(this.endDate),
  //               entity: entities
  //               };
  //   } else {
  //     filter = {_start: this.transformDate(this.startDate), _end: this.transformDate(this.endDate)};
  //   }
  //   this.filterForm.value.filter = filter;
  // }



  // transformDate(date: Date) {
  //   if (date) {
  //     const month = date.getMonth() + 1;
  //     const monthWithZero = month <= 9 ? '0' + month.toString() : month.toString();

  //     const day = date.getDate();
  //     const dayWithZero = day <= 9 ? '0' + day.toString() : day.toString();

  //     const tempDate = date.getFullYear() + '-' + monthWithZero + '-' + dayWithZero;
  //     return tempDate;
  //   }
  // }

  // onDateChange(event, where) {
  //   this.filterForm.value[where] = this.transformDate(event.value);


  //   this.filterForm.get('filter').get(where).setValue(this.transformDate(event.value));
  // }

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

      const startYear = project.start.getFullYear(); // we assume it is first day of year of the project start
      this.startDate = new Date(startYear, 0, 1);

      const currentYear = new Date().getFullYear(); // we assume it is last day of the current year
      this.endDate = new Date(currentYear, 11, 31);

      this.filterForm = this.fb.group({
        _start: [this.startDate, Validators.required],
        _end: [this.endDate, Validators.required ],
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
