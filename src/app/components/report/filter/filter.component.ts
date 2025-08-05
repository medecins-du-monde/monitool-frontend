import { Component, OnInit, EventEmitter, Input, Output, OnDestroy, Renderer2, OnChanges, SimpleChanges} from '@angular/core';
import {  UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Project } from 'src/app/models/classes/project.model';
import { ProjectService } from 'src/app/services/project.service';
import { Entity } from 'src/app/models/classes/entity.model';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MY_DATE_FORMATS } from 'src/app/utils/format-datepicker-helper';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import { DateService} from 'src/app/services/date.service';
import { Group } from 'src/app/models/classes/group.model';
import _ from 'lodash';
import DatesHelper from 'src/app/utils/dates-helper';
import { CountryListService } from 'src/app/services/country-list.service';
import { TranslateService } from '@ngx-translate/core';
import { finished } from 'stream';


export interface Filter{
  _start: Date;
  _end: Date;
  entities?: string[];
  finished?: boolean;
  countries?: string[];
  continents?: string[];
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
export class FilterComponent implements OnInit, OnChanges, OnDestroy{

  collapsed = true;

  selectedSites = [];

  sites: Entity[] = [];
  filterForm: UntypedFormGroup;

  @Input() isCrossCuttingReport = false;
  @Input() project: Project;
  @Input() showComments = false;
  @Input() showHidden = false;
  @Input() userIsAdmin = false;
  @Input() filterEnd?: Date; // used to auto adjust based on periodicity;
  @Input() filterStart?: Date; // used to auto adjust based on periodicity;
  @Output() filterEvent: EventEmitter<Filter> = new EventEmitter<Filter>();
  @Output() showCommentsChange = new EventEmitter<boolean>();
  @Output() showHiddenChange = new EventEmitter<boolean>();

  private subscription: Subscription = new Subscription();
  entities: Entity[];
  groups: Group[];

  get currentLang(): string{
    return this.translateService.currentLang ? this.translateService.currentLang : this.translateService.defaultLang;
  }

  public filteredCountryList: any[];
  public get continentList() {
    return this.countryListService.getContinents();
  }

  constructor(
    private fb: UntypedFormBuilder,
    private projectService: ProjectService,
    private adapter: DateAdapter<any>,
    private dateService: DateService,
    private countryListService: CountryListService,
    private translateService: TranslateService,
    private renderer: Renderer2
  ) { }

  onEntityRemoved(entity: Entity): void {
    this.selectedSites = this.selectedSites.filter(site => site.id !== entity.id);
    this.filterForm.get('entities').setValue(this.selectedSites.map(x => x.id));
  }

  toggleCollapsed(): void {
    this.collapsed = this.collapsed ? false : true;
  }

  ngOnInit(): void {
    this.subscription.add(
      this.dateService.currentLang.subscribe(
        lang => {
          this.adapter.setLocale(lang);
        }
      )
    );
    // by default the end date is the last day of the current year
    // and the start date is the first day of the previous year
    let endDate = new Date((new Date()).getFullYear(), 11, 31);
    let startDate = new Date((new Date()).getFullYear() - 1, 0, 1);

    if (this.isCrossCuttingReport){
      this.filteredCountryList = this.countryListService.getCountries();
      this.filterForm = this.fb.group({
        _start: [startDate, Validators.required],
        _end: [endDate, Validators.required],
        finished: [true, Validators.required],
        countries: [[]],
        continents: [[]],
      });
      this.filterEvent.emit(this.filterForm.value);

      this.filterForm.valueChanges.subscribe(value => {
        this.selectedSites = this.sites.filter( site => value.entities.includes(site.id) );
        if (new Date(value._start) > new Date(value._end)) {
          this.filterForm.patchValue({_end: value._start});
        }
        if (new Date(value._end) < new Date(value._start)) {
          this.filterForm.patchValue({_start: value._end});
        }
        this.filterEvent.emit(this.filterForm.value);
      });
    } else {
      this.subscription.add(
        this.projectService.openedProject.subscribe( (project: Project): void => {
          this.project = project;

          if (this.project){
            this.sites = this.project.entities;
            this.entities = this.project.entities;
            this.groups = this.project.groups;
            endDate = this.project.end;
            startDate = this.project.start;
            this.selectedSites = this.project.entities.map(entity => entity);
          }

          this.filterForm = this.fb.group({
            _start: [startDate, Validators.required],
            _end: [endDate, Validators.required ],
            entities: [this.project.entities, Validators.required]
          });

          this.filterEvent.emit(this.filterForm.value);

          let oldFilterFormValue = _.cloneDeep(this.filterForm).value;

          this.subscription.add(
            this.filterForm.valueChanges.subscribe(newFilterValue => {
              if (!DatesHelper.areEquals(oldFilterFormValue._start, newFilterValue._start)
                  || !DatesHelper.areEquals(oldFilterFormValue._end, newFilterValue._end)
                  || JSON.stringify(oldFilterFormValue.entities)
                    !== JSON.stringify(newFilterValue.entities.filter(
                      element => element instanceof Entity && element.id !== 'all')
                      .map(entity => entity.id))) {
                  this.selectedSites = this.sites.filter( site => newFilterValue.entities.includes(site) );
                  oldFilterFormValue = newFilterValue;
                  this.filterEvent.emit(newFilterValue as Filter);
              }
            })
          );
        })
      );
    }

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.filterEnd && changes.filterEnd.currentValue !== changes.filterEnd.previousValue) {
      this.filterForm.patchValue({_end: changes.filterEnd.currentValue})
    }
    if (changes.filterStart && changes.filterStart.currentValue !== changes.filterStart.previousValue) {
      this.filterForm.patchValue({_start: changes.filterStart.currentValue})
    }
  }

  onSearchCountry(value = '') {
    this.filteredCountryList = this.countryListService.getCountries(null, this.filterForm.get('continents').value, value.toLowerCase(), this.filterForm.get('countries').value);
  }

  resetCountryInput(event: boolean, element: HTMLElement) {
    if (!event) {
      this.renderer.setProperty(element, 'value', '');
      this.onSearchCountry('');
    }
  }

  resetCountrySearch(event: boolean) {
    if (event) return;
    const continents = this.filterForm.get('continents').value;
    const countries = this.filterForm.get('countries').value;
    if (continents.length > 0 && countries.length > 0) {
      const newCountries: string[] = [];
      countries.forEach(key => {
        if (continents.includes(this.countryListService.getCountry(key).continent)) {
          newCountries.push(key);
        }
      })
      this.filterForm.get('countries').patchValue(newCountries);
    }
    this.onSearchCountry();
  }

  resetFilters() {
    // by default the end date is the last day of the current year
    // and the start date is the first day of the previous year
    let endDate = new Date((new Date()).getFullYear(), 11, 31);
    let startDate = new Date((new Date()).getFullYear() - 1, 0, 1);

    if (this.isCrossCuttingReport){
      this.filterForm.patchValue({
        _start: this.filterStart || startDate,
        _end: endDate,
        finished: true,
        countries: [],
        continents: []
      });
      this.filterEvent.emit(this.filterForm.value);
    } else {
      if (this.project){
        endDate = this.project.end;
        startDate = this.project.start;
      }
      this.filterForm.patchValue({
        _start: this.filterStart || startDate,
        _end: endDate,
        entities: [...this.project.entities, ...this.groups, {id: 'all'}]
      });
      this.filterEvent.emit(this.filterForm.value);
    }
  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }
}
