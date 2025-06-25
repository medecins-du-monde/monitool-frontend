import { Component, OnInit } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { Indicator } from 'src/app/models/classes/indicator.model';
import { IndicatorService } from 'src/app/services/indicator.service';
import { IndicatorModalComponent } from './components/indicator-modal/indicator-modal.component';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmModalComponent } from 'src/app/components/confirm-modal/confirm-modal.component';


@Component({
  selector: 'app-indicators',
  templateUrl: './indicators.component.html',
  styleUrls: ['./indicators.component.scss']
})
export class IndicatorsComponent implements OnInit {

  required: Indicator[] = [];
  nonRequired: Indicator[] = [];

  get currentLang(): string {
    return this.translateService.currentLang ? this.translateService.currentLang : this.translateService.defaultLang;
  }

  constructor(
    private indicatorService: IndicatorService,
    private dialog: MatDialog,
    private translateService: TranslateService
  ) { }

  ngOnInit(): void {
    this.getIndicators();
  }

  private getIndicators() {
    this.indicatorService.list().then((res: Indicator[]) => {
      this.required = [];
      this.nonRequired = [];
      res.map((indicator: Indicator) => {
        if (indicator.required) {
          this.required.push(indicator);
        } else {
          this.nonRequired.push(indicator);
        }
      });
    });
  }

  onDelete(id: string) {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {data: {messageId: 'DeleteConfirmation'}});
    const dialogSubscription = dialogRef.afterClosed().subscribe(res => {
      if (res.confirm){
        this.indicatorService.delete(id).then(() => this.getIndicators());
        dialogSubscription.unsubscribe();
      }
    });
  }

  onEdit(indicator: Indicator) {
    const dialogRef = this.dialog.open(IndicatorModalComponent, { data: indicator });

    const dialogSubscription = dialogRef.afterClosed().subscribe(res => {
      if (res && res.data) {
        this.indicatorService.save(res.data).then(() => this.getIndicators());
        dialogSubscription.unsubscribe();
      }
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(IndicatorModalComponent);

    const dialogSubscription = dialogRef.afterClosed().subscribe(res => {
      if (res && res.data) {
        this.indicatorService.save(res.data).then(() => this.getIndicators());
        dialogSubscription.unsubscribe();
      }
    });
  }

}
