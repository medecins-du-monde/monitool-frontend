import { ChangeDetectorRef, Component, EventEmitter, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { Project } from 'src/app/models/classes/project.model';
import { Theme } from 'src/app/models/classes/theme.model';
import { ProjectService } from 'src/app/services/project.service';
import { ThemeService } from 'src/app/services/theme.service';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MY_DATE_FORMATS } from 'src/app/utils/format-datepicker-helper';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateService } from 'src/app/services/date.service';

import DatesHelper from 'src/app/utils/dates-helper';
import InformationItem from 'src/app/models/interfaces/information-item';
import BreadcrumbItem from 'src/app/models/interfaces/breadcrumb-item.model';
import { CountryListService } from 'src/app/services/country-list.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-basics',
  templateUrl: './basics.component.html',
  styleUrls: ['./basics.component.scss'],
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
export class BasicsComponent implements OnInit, OnDestroy {

  basicsForm: UntypedFormGroup;

  themes: Theme[] = [];

  informations = [
    {
      res1: 'InformationPanel.Basics',
      res2: 'InformationPanel.Basics_description'
    } as InformationItem,
    {
      res1: 'InformationPanel.Project_definition_question',
      res2: 'InformationPanel.Project_definition_response'
    } as InformationItem,
    {
      res1: 'InformationPanel.General_Naming_convention_question',
      res2: 'InformationPanel.General_Naming_convention_response'
    } as InformationItem,
    {
      res1: 'InformationPanel.General_accidental_delete_question',
      res2: 'InformationPanel.General_accidental_delete_response'
    } as InformationItem,
    {
      res1: 'InformationPanel.General_delete_saved_question',
      res2: 'InformationPanel.General_delete_saved_response'
    } as InformationItem,
    {
      res1: 'InformationPanel.Basics_question1',
      res2: 'InformationPanel.Basics_response1'
    } as InformationItem
  ];

  private subscription: Subscription = new Subscription();

  get currentLang() {
    return this.translateService.currentLang ? this.translateService.currentLang : this.translateService.defaultLang;
  }

  get selectedThemes() {
    return this.basicsForm ? this.themes.filter(x => this.basicsForm.controls.themes.value.includes(x.id)) : [];
  }

  public filteredCountryList: any[];
  public get continentList() {
    return this.countryListService.getContinents();
  }

  public legacyCountry?: string;
  public startDateDisabled = true;

  constructor(
    private fb: UntypedFormBuilder,
    private projectService: ProjectService,
    private themeService: ThemeService,
    private translateService: TranslateService,
    private adapter: DateAdapter<any>,
    private dateService: DateService,
    private changeDetector: ChangeDetectorRef,
    private countryListService: CountryListService,
    private renderer: Renderer2,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    // TODO: Check if the subscription.add is usefull, if yes, we may have to set it everywhere
    this.filteredCountryList = this.countryListService.getCountries();
    this.subscription.add(
      this.projectService.openedProject.subscribe((project: Project) => {
        if (project.countries.length === 1 && !this.countryListService.getCountry(project.countries[0])) {
          this.legacyCountry = project.countries[0];
        }
        this.basicsForm = this.fb.group({
          continents: [project.continents, Validators.required],
          countries: [project.countries.map(x => this.countryListService.getCountry(x) ? x : null), Validators.required],
          region: [project.region],
          name: [project.name, Validators.required],
          themes: [project.themes.map(x => x.id)],
          start: [project.start, Validators.required],
          end: [project.end, Validators.required],
          visibility: [project.visibility, Validators.required]
        }, { validators: [DatesHelper.orderedDates('start', 'end')] });
        this.onSearch('');
        this.subscription.add(
          this.basicsForm.valueChanges.subscribe((value: any) => {
            if (value.start._d) {
              project.entities.forEach(entity => {
                entity.start = new Date(entity.start).getTime() === new Date(project.start).getTime() ? value.start._d : entity.start;
              });
              project.forms.forEach(form => {
                form.start = new Date(form.start).getTime() === new Date(project.start).getTime() ? value.start._d : form.start;
              });
            }

            if (value.end._d) {
              project.entities.forEach(entity => {
                entity.end = new Date(entity.end).getTime() === new Date(project.end).getTime() ? value.end._d : entity.end;
              });
              project.forms.forEach(form => {
                form.end = new Date(form.end).getTime() === new Date(project.end).getTime() ? value.end._d : form.end;
              });
              project.logicalFrames.forEach(logicalFrame => {
                logicalFrame.end = new Date(logicalFrame.end).getTime() === new Date(project.end).getTime() ?
                  value.end._d : logicalFrame.end;
              });
            }

            if (!value.region || value.region === '') {
              value.region = undefined;
            }

            if (value.countries) {
              const countries = value.countries.map(x => this.countryListService.getCountry(x));
              const countriesContinents = countries.map(x => x.continent).filter((x, index, self) => self.indexOf(x) === index);

              if (JSON.stringify(value.countries) !== JSON.stringify(project.countries)) {
                // If there are countries selected but no continent, we select the continents of the selected countries
                if (countries.length > 0 && countries.some(x => x) && value.continents.length === 0) {
                  value.continents = countriesContinents;
                  this.basicsForm.get('continents').setValue(value.continents);
                }
              }
              if (JSON.stringify(value.continents) !== JSON.stringify(project.continents)) {
                // If there are countries and continents selected but some of the selected countries do not belong to the selected continents, we deselect the countries that do not belong to the selected continents
                if (countries.length > 0 && value.continents.length > 0 && !countries.every(x => value.continents.includes(x.continent))) {
                  value.countries = value.countries.filter((country, i) => value.continents.includes(countries[i].continent));
                  this.basicsForm.get('countries').setValue(value.countries);
                }
              }
            }

            const selectedThemes = value.themes;
            value.themes = this.themes.filter(x => selectedThemes.includes(x.id));
            this.projectService.valid = this.basicsForm.valid;
            this.projectService.project.next(Object.assign(project, value));
          })
        );
        this.changeDetector.markForCheck();
      })
    );
    this.projectService.hasInputs(this.projectService.projectId.value).then((res: boolean) => {
      this.startDateDisabled = res && this.authService.user.getValue()?.role !== 'admin';
    });

    this.subscription.add(
      this.projectService.lastSavedVersion.subscribe(savedProject => {
        const breadCrumbs = [
          {
            value: 'Projects',
            link: './../../projects'
          } as BreadcrumbItem,
          {
            value: savedProject.countries,
            isCountry: true,
          } as BreadcrumbItem,
          {
            value: savedProject.name,
          } as BreadcrumbItem,
          {
            value: 'Structure',
          } as BreadcrumbItem,
          {
            value: 'Basics',
          } as BreadcrumbItem,
        ];
        if (savedProject.region) {
          breadCrumbs.splice(2, 0, 
            {
              value: savedProject.region,
            } as BreadcrumbItem,
          );
        }
        this.projectService.updateBreadCrumbs(breadCrumbs);
      })
    );

    this.themeService.list().then((res: Theme[]) => {
      this.themes = res;
      this.changeDetector.markForCheck();
    });

    this.subscription.add(
      this.dateService.currentLang.subscribe(lang => {
        this.adapter.setLocale(lang);
      })
    );
    this.projectService.updateInformationPanel(this.informations);
  }

  onSearch(value: string) {
    this.filteredCountryList = this.countryListService.getCountries(
      undefined,
      this.basicsForm.value.continents ? this.basicsForm.value.continents : [],
      value,
      this.basicsForm.value.countries ? this.basicsForm.value.countries : [])
  }

  resetInput(event: boolean, element: HTMLElement) {
    if (!event) {
      this.renderer.setProperty(element, 'value', '');
      this.onSearch('');
    }
  }

  themeIsSelected(id: string) {
    return this.selectedThemes.find((t: Theme) => t.id === id);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onThemeRemoved(theme: Theme) {
    const themes = this.basicsForm.controls.themes.value;
    this.basicsForm.controls.themes.setValue(themes.filter(t => t !== theme.id));
  }
}
