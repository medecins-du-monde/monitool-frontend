import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogRef } from '@angular/material/legacy-dialog';
import { TranslateService } from '@ngx-translate/core';
import { Indicator } from 'src/app/models/classes/indicator.model';
import { Theme } from 'src/app/models/classes/theme.model';
import { CountryListService } from 'src/app/services/country-list.service';

@Component({
  selector: 'app-export-modal',
  templateUrl: './export-modal.component.html',
  styleUrls: ['./export-modal.component.scss']
})
export class ExportModalComponent implements OnInit {

  public filterForm: UntypedFormGroup;

  public filteredCountryList: any[];
  public get continentList() {
    return this.countryListService.getContinents();
  }

  public filteredIndicators: Indicator[] = [];
  public themes: Theme[] = [];

  get currentLang(): string{
    return this.translateService.currentLang ? this.translateService.currentLang : this.translateService.defaultLang;
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {indicators: Indicator[], selectedIndicatorIds: string[]},
    private dialogRef: MatLegacyDialogRef<ExportModalComponent>,
    public fb: FormBuilder,
    public countryListService: CountryListService,
    private translateService: TranslateService,
    private renderer: Renderer2
  ) { }

  ngOnInit() {
    this.filterForm = this.fb.group({
      _start: [''],
      _end: [''],
      countries: [[]],
      continents: [[]],
      thematics: [[]],
      indicators: [this.data.selectedIndicatorIds || []],
    });
    for(const indicator of this.data.indicators) {
      for(const theme of indicator.themes) {
        if (!this.themes.find(t => t.id === theme.id)) this.themes.push(theme);
      }
    }
    this.filterIndicators();
    this.filteredCountryList = this.countryListService.getCountries();
    console.log(this.data);
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

  filterIndicators() {
    this.filteredIndicators = [];
    if (this.filterForm.value.thematics.length === 0) {
      this.filteredIndicators = this.data.indicators;
    } else {
      for(const indicator of this.data.indicators) {
        if (indicator.themes.some(theme => this.filterForm.value.thematics.includes(theme.id))) {
          this.filteredIndicators.push(indicator);
        }
      }
    }
  }

  resetIndicators(event: boolean) {
    if (event) return;
    this.filterIndicators();
  }

  submit() {
    const results = this.filterForm.value;
    if (results.indicators.length <= 0) {
      results.indicators = this.filteredIndicators.map(ind => ind.id);
    }
    this.dialogRef.close(results);
  }

}
