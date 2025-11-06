import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Indicator } from 'src/app/models/classes/indicator.model';
import { Theme } from 'src/app/models/classes/theme.model';
import { IndicatorService } from 'src/app/services/indicator.service';
import { ExportModalComponent } from './components/export-modal/export-modal.component';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { FormBuilder, UntypedFormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ThemeService } from 'src/app/services/theme.service';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/classes/user.model';

@Component({
  selector: 'app-indicators',
  templateUrl: './indicators.component.html',
  styleUrls: ['./indicators.component.scss']
})
export class IndicatorsComponent implements OnInit {

  indicators: Indicator[] = [];
  filteredIndicators: Indicator[] = [];
  filteredRequiredIndicators: Indicator[] = [];
  selectedIndicatorIds: {[id: string]: boolean} = {};
  themes: Theme[] = [];

  get currentLang() {
    return this.translateService.currentLang ? this.translateService.currentLang : this.translateService.defaultLang;
  }
  get selectedIndicatorIdsArray() {
    return Object.keys(this.selectedIndicatorIds);
  }
  get allFilteredIndicatorsSelected() {
    for (const ind of this.filteredIndicators) {
      if (!this.selectedIndicatorIds[ind.id]) return false;
    }
    return this.selectedIndicatorIdsArray.length > 0;
  }

  filtersForm: UntypedFormGroup;

  displayedColumns: string[] = ['battle', 'name', 'report'];

  userIsAdmin = false;

  private subscription = new Subscription();

  constructor(
    private translateService: TranslateService,
    private indicatorService: IndicatorService,
    private themeService: ThemeService,
    private dialog: MatDialog,
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
  ) {
    this.filtersForm = this.fb.group({
      search: '',
      battles: [[]],
      showDisabled: false,
    });

    this.subscription.add(
      this.filtersForm.valueChanges.subscribe(() => {
        this.filterIndicators();
      })
    );
    this.subscription.add(
      this.authService.currentUser.subscribe(
        (user: User) => {
          this.userIsAdmin = user.role === 'admin' ? true : false
        }
      )
    );
  }

  ngOnInit(): void {
    this.indicatorService.list().then((indicators: Indicator[]) => {
      this.indicators = indicators;
      this.filterIndicators();
    });
    this.themeService.list('all').then((themes: Theme[]) => {
      this.themes = themes.sort((a, b) => a.type > b.type ? 1 : -1);
    })
  }

  filterIndicators(): void {
    this.filteredIndicators = [];
    this.filteredRequiredIndicators = [];
    this.indicators.forEach(x => {
      if (!this.filtersForm.value.showDisabled && x.disabled) {
        return;
      }
      if (this.filtersForm.value.battles.length > 0) {
        if (!x.themes.find(theme => this.filtersForm.value.battles.includes(theme.id))) {
          return;
        }
      }
      if (this.filtersForm.value.search !== "") {
        if (!(
          x.name[this.currentLang].toLowerCase().includes(this.filtersForm.value.search.toLowerCase()) ||
          x.description[this.currentLang].toLowerCase().includes(this.filtersForm.value.search.toLowerCase())
        )) {
          return;
        }
      }
      if (x.required) {
        this.filteredRequiredIndicators.push(x)
      } else {
        this.filteredIndicators.push(x);
      }
    });
  }

  onSearch(e: any): void {
    this.filtersForm.controls.search.setValue(e);
  }

  selectIndicator(value: boolean, id?: string) {
    if (!id) {
      for (const ind of this.filteredIndicators) {
        value ? this.selectedIndicatorIds[ind.id] = true : delete this.selectedIndicatorIds[ind.id];
      }
      for (const ind of this.filteredRequiredIndicators) {
        value ? this.selectedIndicatorIds[ind.id] = true : delete this.selectedIndicatorIds[ind.id];
      }
    } else {
      value ? this.selectedIndicatorIds[id] = true : delete this.selectedIndicatorIds[id];
    }
  }
  
  downloadNewCC(indicatorIds?: string[]): void {
    const dialogRef = this.dialog.open(ExportModalComponent, {
      data: {
        indicators: this.indicators.filter(i => !i.disabled || this.selectedIndicatorIds[i.id]),
        selectedIndicatorIds: indicatorIds || this.selectedIndicatorIdsArray,
      }
    });

    const dialogSubscription = dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
        const url =
          'api_export-newCC_' +
          result.indicators.join('+') +
          '_' + this.currentLang +
          '_' + result.countries.join('+') +
          '_' + result.continents.join('+') +
          '_' + (result._start ? result._start.toISOString() : '') +
          '_' +  (result._end ? result._end.toISOString() : '');
        console.log(url);
        window.open(this.router.url + '/download/' + url, '_blank');
        dialogSubscription.unsubscribe();
      }
    });
  }
  
  onOpen(id: string): void{
    // this.router.navigate(['/indicators/indicator', id]);
    window.open(`/indicators/indicator/${id}`, "_blank", "noreferrer");
  }

  log(item) {
    console.log(item);
  }

}
