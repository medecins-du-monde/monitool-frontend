import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Indicator } from 'src/app/models/classes/indicator.model';
import { IndicatorService } from 'src/app/services/indicator.service';
import { IndicatorModalComponent } from './components/indicator-modal/indicator-modal.component';
import { ThemeService } from 'src/app/services/theme.service';
import { Theme } from 'src/app/models/classes/theme.model';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-indicators',
  templateUrl: './indicators.component.html',
  styleUrls: ['./indicators.component.scss']
})
export class IndicatorsComponent implements OnInit {

  indicators: Indicator[];
  themes: Theme[];

  constructor(
    private indicatorService: IndicatorService,
    private themeService :ThemeService,
    private translateService: TranslateService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getIndicators();
    this.getThemes();
  }

  get currentLang() {
    return this.translateService.currentLang ? this.translateService.currentLang : this.translateService.defaultLang;
  }

  private getThemes(){
    this.themeService.list().then((res: Theme[]) => {
      this.themes = res.sort((a,b) => (a.name.en > b.name.en)? 1: -1);
    });
  }

  private getIndicators() {
    this.indicatorService.list().then((res: Indicator[]) => {
      this.indicators = res.sort((a,b) => (a.name.en > b.name.en)? 1: -1);
    });    
  }

  onDelete(id: string) {
    this.indicatorService.delete(id).then(() => this.getIndicators());
  }

  onEdit(indicator: Indicator) {
    this.indicatorService.save(indicator).then(() => this.getIndicators());
  }

  openDialog() {
    const dialogRef = this.dialog.open(IndicatorModalComponent);

    dialogRef.afterClosed().subscribe(res => {
      if (res && res.data) {
        this.indicatorService.save(res.data).then(() => this.getIndicators());
      }
    });
  }

}
