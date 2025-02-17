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
    const country = {...this.countries[key]};
    for (const lang of ['en', 'es', 'fr']) {
      if (typeof country[lang] !== 'string')
        country[lang] = country[lang][0];
    }
    return country;
  }
  public getContinent(key: string): any {
    return this.continents[key];
  }

  public getContinents(): any[] {
    return this.continentArray;
  }

  public getCountriesByContinent(searchKey = "", selectedCountries: string[] = []): any {
    // let availableCountries = [];
    const result = [];

    for (const continent of Object.keys(this.countriesByContinent)) {
      const matchingCountries = [];
      for (const country of Object.keys(this.countriesByContinent[continent])) {
        if (country.includes(searchKey) || selectedCountries.includes(country)) {
          matchingCountries.push({...this.countriesByContinent[continent][country], key: country});
          continue;
        }
        for (const lang of ['en', 'es', 'fr']) {
          const name = this.countriesByContinent[continent][country][lang];
          if (typeof name === 'string' ? name.toLowerCase().includes(searchKey) : name.find(val => val.toLowerCase().includes(searchKey))) {
            matchingCountries.push({...this.countriesByContinent[continent][country], key: country});
            break;
          }
        }
      }
      if (matchingCountries.length > 0) {
        result.push({...this.continents[continent], key: continent, countries: matchingCountries})
      }
    }
    return result;
  }

  public getCountries(quantity?: number, continents: string[] = [], searchKey = "", selectedCountries: string[] = []): any[] {
    searchKey = searchKey.toLowerCase();
    let availableCountries = this.countries;
    if (continents.length > 0) {
      availableCountries = {};
      continents.forEach(key => {availableCountries = {...availableCountries, ...this.countriesByContinent[key]}});
    }
    const filteredList = [];

    if (selectedCountries.length > 0) {
      selectedCountries.forEach(key => {filteredList.push({...this.countries[key], key: key})})
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
          if (typeof name !== 'string') {
            availableCountries[value][lang] = name[0];
          }
          toBeIncluded = true;
          break;
        }
      }
      if (toBeIncluded && !selectedCountries.includes(value)) {
        filteredList.push({...availableCountries[value], key: value});
      }
    }
    return filteredList;
  }


}
