import { Component, OnInit, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ProjectIndicator } from 'src/app/models/project-indicator.model';

@Component({
  selector: 'app-extra-indicator',
  templateUrl: './extra-indicator.component.html',
  styleUrls: ['./extra-indicator.component.scss']
})
export class ExtraIndicatorComponent implements OnInit {

  @Input() extraIndicator: ProjectIndicator;

  constructor() { }

  ngOnInit(): void {
  }

}
