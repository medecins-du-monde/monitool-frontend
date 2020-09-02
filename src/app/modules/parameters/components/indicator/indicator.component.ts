import { Component, OnInit, Input } from '@angular/core';
import { themes } from 'src/app/constants/themes';
import { Indicator } from 'src/app/models/indicator';

@Component({
  selector: 'app-indicator',
  templateUrl: './indicator.component.html',
  styleUrls: ['./indicator.component.scss']
})
export class IndicatorComponent implements OnInit {
  @Input() indicator: Indicator;
  themesNames: string[] = [];

  constructor() { }

  ngOnInit(): void {
    this.indicator.themes.forEach(theme => {
      this.themesNames.push(themes.find(t => t._id === theme).shortName.fr);
    });
  }

}
