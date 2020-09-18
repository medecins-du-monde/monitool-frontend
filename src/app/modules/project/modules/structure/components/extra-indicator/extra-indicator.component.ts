import { Component, OnInit, Input } from '@angular/core';
import { Indicator } from 'src/app/models/indicator';

@Component({
  selector: 'app-extra-indicator',
  templateUrl: './extra-indicator.component.html',
  styleUrls: ['./extra-indicator.component.scss']
})
export class ExtraIndicatorComponent implements OnInit {

  @Input() computation = false;
  @Input() indicator: Indicator;

  constructor() { }

  ngOnInit(): void {
  }

}
