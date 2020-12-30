import { IndicatorService } from 'src/app/services/indicator.service';
import { Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Indicator } from 'src/app/models/indicator.model';

@Component({
  selector: 'app-indicator',
  templateUrl: './indicator.component.html',
  styleUrls: ['./indicator.component.scss']
})
export class IndicatorComponent implements OnInit {

  @Input() indicator: Indicator;

  get currentLang() {
    return this.translateService.currentLang ? this.translateService.currentLang : this.translateService.defaultLang;
  }

  constructor(private translateService: TranslateService,private indicatorService: IndicatorService,
    private router: Router) { }

  ngOnInit(): void {}

  onOpen(){
    // this.indicatorService.get(this.indicator.id).then(() => {
      this.router.navigate(['/indicators/indicator', this.indicator.id]);
 //   });
  }

}
