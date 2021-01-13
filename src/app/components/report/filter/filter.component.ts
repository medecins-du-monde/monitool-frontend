import { Component, OnInit, EventEmitter, Input, Output, OnDestroy} from '@angular/core';
import {  FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Project } from 'src/app/models/project.model';
import { ProjectService } from 'src/app/services/project.service';
import { Entity } from 'src/app/models/entity.model';
import { Subscription } from 'rxjs';


export interface Filter{
  _start: Date;
  _end: Date;
  entity?: string[];
  finished?: boolean;
}

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit, OnDestroy{

  collapsed = true;

  selectedSites = [];

  sites: Entity[] = [];
  filterForm: FormGroup;

  @Input() isCrosscuttingReport = false;
  @Input() project: Project;
  @Output() filterEvent: EventEmitter<Filter> = new EventEmitter<Filter>();

  private subscription: Subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService
  ) { }

  onEntityRemoved(entity: Entity): void {
    this.selectedSites = this.selectedSites.filter(site => site.id !== entity.id);
    this.filterForm.get('entity').setValue(this.selectedSites.map(x => x.id));
  }

  toggleCollapsed(): void {
    this.collapsed = this.collapsed ? false : true;
  }

  ngOnInit(): void {

    // by default the end date is the last day of the current year
    // and the start date is the first day of the previous year
    let endDate = new Date((new Date()).getFullYear(), 11, 31);
    let startDate = new Date((new Date()).getFullYear() - 1, 0, 1);

    if (this.isCrosscuttingReport){
      this.filterForm = this.fb.group({
        _start: [startDate, Validators.required],
        _end: [endDate, Validators.required],
        finished: [false, Validators.required],
      });
      this.filterEvent.emit(this.filterForm.value);

      this.filterForm.valueChanges.subscribe(value => {
        this.selectedSites = this.sites.filter( site => value.entity.includes(site.id) );
        this.filterEvent.emit(value as Filter);
      });
    } else {
      this.subscription.add(
        this.projectService.openedProject.subscribe( (project: Project): void => {
          this.project = project;

          if (this.project){
            this.sites = this.project.entities;
            endDate = this.project.end;
            startDate = this.project.start;

            this.selectedSites = this.project.entities.map(entity => entity);
          }

          this.filterForm = this.fb.group({
            _start: [startDate, Validators.required],
            _end: [endDate, Validators.required ],
            entity: [this.project.entities.map(x => x.id), Validators.required]
          });
          this.filterEvent.emit(this.filterForm.value);

          this.filterForm.valueChanges.subscribe(value => {
            this.selectedSites = this.sites.filter( site => value.entity.includes(site.id) );
            this.filterEvent.emit(value as Filter);
          });
        })
      );
    }

  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }
}
