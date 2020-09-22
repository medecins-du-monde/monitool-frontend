import { Component, OnInit, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Indicator } from 'src/app/models/indicator.model';

@Component({
  selector: 'app-cross-cutting-indicator',
  templateUrl: './cross-cutting-indicator.component.html',
  styleUrls: ['./cross-cutting-indicator.component.scss']
})
export class CrossCuttingIndicatorComponent implements OnInit {

  @Input() crossCutting: any;

  @Input() indicator: Indicator;

  get currentLang() {
    return this.translateService.currentLang ? this.translateService.currentLang : this.translateService.defaultLang;
  }

  constructor(private translateService: TranslateService) { }

  ngOnInit(): void {
  }

}
