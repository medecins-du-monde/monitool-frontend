import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Indicator } from 'src/app/models/classes/indicator.model';
import { Theme } from 'src/app/models/classes/theme.model';
import { IndicatorService } from 'src/app/services/indicator.service';
import { ExportModalComponent } from './components/export-modal/export-modal.component';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';

@Component({
  selector: 'app-indicators',
  templateUrl: './indicators.component.html',
  styleUrls: ['./indicators.component.scss']
})
export class IndicatorsComponent implements OnInit {

  indicators: Indicator[] = [];

  groups: { theme: Theme, indicators: Indicator[]}[] = [];

  multiThemesIndicators: Indicator[] = [];

  get currentLang() {
    return this.translateService.currentLang ? this.translateService.currentLang : this.translateService.defaultLang;
  }

  constructor(
    private translateService: TranslateService,
    private indicatorService: IndicatorService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.indicatorService.list().then((indicators: Indicator[]) => {
      this.indicators = indicators;
      this.groups = [];
      this.multiThemesIndicators = [];
      this.indicators.forEach(x => {
        if (x.multiThemes) {
          this.multiThemesIndicators.push(x);
        } else {
          const group = this.groups.find(g => g.theme.id === x.themes[0].id );
          if ( group ) {
            group.indicators.push(x);
          } else {
            this.groups.push({ theme: x.themes[0], indicators: [x] });
          }
        }
      });
    });
  }
  
    downloadNewCC(): void {
      const dialogRef = this.dialog.open(ExportModalComponent, {
        data: {
          indicators: this.indicators
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

}
