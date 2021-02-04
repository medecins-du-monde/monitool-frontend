import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Indicator } from 'src/app/models/classes/indicator.model';
import { IndicatorService } from 'src/app/services/indicator.service';
import { IndicatorModalComponent } from './components/indicator-modal/indicator-modal.component';
import { Theme } from 'src/app/models/classes/theme.model';

@Component({
  selector: 'app-indicators',
  templateUrl: './indicators.component.html',
  styleUrls: ['./indicators.component.scss']
})
export class IndicatorsComponent implements OnInit {

  indicators: Indicator[];

  constructor(
    private indicatorService: IndicatorService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getIndicators();
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
