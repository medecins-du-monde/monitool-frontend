import { Component, OnInit, EventEmitter, Input, Output, OnDestroy} from '@angular/core';
import {  FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Project } from 'src/app/models/classes/project.model';
import { ProjectService } from 'src/app/services/project.service';
import { Entity } from 'src/app/models/classes/entity.model';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MY_DATE_FORMATS } from 'src/app/utils/format-datepicker-helper';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import { DateService} from 'src/app/services/date.service';


export interface Filter{
  _start: Date;
  _end: Date;
  entity?: string[];
  finished?: boolean;
}

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
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
    private projectService: ProjectService,
    private adapter: DateAdapter<any>,
    private dateService: DateService,
  ) { }

  onEntityRemoved(entity: Entity): void {
    this.selectedSites = this.selectedSites.filter(site => site.id !== entity.id);
    this.filterForm.get('entity').setValue(this.selectedSites.map(x => x.id));
  }

  toggleCollapsed(): void {
    this.collapsed = this.collapsed ? false : true;
  }

  ngOnInit(): void {
    this.dateService.currentLang.subscribe(
      lang => {
        this.adapter.setLocale(lang);
      }
    );
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
            const filterChanges = {
              entity: value.entity,
              _end : value._end._d ? value._end._d : value._end,
              _start: value._start._d ? value._start._d : value._start
            }
            this.selectedSites = this.sites.filter( site => value.entity.includes(site.id) );
            this.filterEvent.emit(filterChanges as Filter);
          });
        })
      );
    }

  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }
}
