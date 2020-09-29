import { Component, OnInit, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ExtraIndicator } from 'src/app/models/extra-indicator.model';

@Component({
  selector: 'app-extra-indicator',
  templateUrl: './extra-indicator.component.html',
  styleUrls: ['./extra-indicator.component.scss']
})
export class ExtraIndicatorComponent implements OnInit {

  @Input() extraIndicator: ExtraIndicator;

  constructor() { }

  ngOnInit(): void {
  }

}
