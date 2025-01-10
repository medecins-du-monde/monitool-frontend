import { Injectable } from '@angular/core';
import { continentList, countryList } from '../utils/iso-countries';
import { TranslateService } from '@ngx-translate/core';



@Injectable({
  providedIn: 'root'
})
export class CountryListService {

  private continents = continentList;
  private countries = countryList;
  private countriesByContinent = {};
  private continentArray = [];

  get currentLang() {
    return this.translate.currentLang ? this.translate.currentLang : this.translate.defaultLang;
  }

  constructor(
    private translate: TranslateService
  ) {
    Object.keys(this.continents).forEach((key: string) => {
      this.countriesByContinent[key] = {};
      this.continentArray.push({...this.continents[key], key})
    });
    Object.keys(this.countries).forEach((key: string) => {
      this.countriesByContinent[this.countries[key].continent][key] = this.countries[key];
    });
  }
  public translateCountry(key: string) {
    return this.countries[key] ? this.countries[key][this.currentLang] : key;
  }

  public getCountry(key: string): any {
    return this.countries[key];
  }
  public getContinent(key: string): any {
    return this.continents[key];
  }

  public getContinents(): any[] {
    return this.continentArray;
  }

  public getCountries(quantity?: number, continent?: string, searchKey = "", selectedCountry?: string): any[] {
    searchKey = searchKey.toLowerCase();
    let availableCountries = this.countries;
    if (continent && this.countriesByContinent[continent]) {
      availableCountries = this.countriesByContinent[continent];
    }
    const filteredList = [];

    if (selectedCountry) {
      filteredList.push({...this.countries[selectedCountry], key: selectedCountry});
    }

    for (const [index, value] of Object.keys(availableCountries).entries()) {
      if (quantity && index > quantity) {
        break;
      }
      let toBeIncluded = false;
      if (value.includes(searchKey)) {
        toBeIncluded = true;
      }
      for (const lang of ['en', 'es', 'fr']) {
        const name = availableCountries[value][lang];
        if (typeof name === 'string' ? name.toLowerCase().includes(searchKey) : name.find(val => val.toLowerCase().includes(searchKey))) {
          toBeIncluded = true;
          break;
        }
      }
      if (toBeIncluded && value !== selectedCountry) {
        filteredList.push({...availableCountries[value], key: value});
      }
    }
    return filteredList;
  }


}
