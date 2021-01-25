import { IndicatorService } from 'src/app/services/indicator.service';
import { Router } from '@angular/router';
import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Indicator } from 'src/app/models/classes/indicator.model';

@Component({
  selector: 'app-indicator',
  templateUrl: './indicator.component.html',
  styleUrls: ['./indicator.component.scss']
})
export class IndicatorComponent {

  @Input() indicator: Indicator;

  get currentLang(): string {
    return this.translateService.currentLang ? this.translateService.currentLang : this.translateService.defaultLang;
  }

  constructor(private translateService: TranslateService, private indicatorService: IndicatorService, private router: Router) { }

  onOpen(): void{
    this.router.navigate(['/indicators/indicator', this.indicator.id]);
  }

}
