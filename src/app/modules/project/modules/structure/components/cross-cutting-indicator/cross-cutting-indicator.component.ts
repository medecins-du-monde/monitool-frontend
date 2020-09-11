import { Component, OnInit, Input } from '@angular/core';
import { Indicator } from 'src/app/models/indicator';

@Component({
  selector: 'app-cross-cutting-indicator',
  templateUrl: './cross-cutting-indicator.component.html',
  styleUrls: ['./cross-cutting-indicator.component.scss']
})
export class CrossCuttingIndicatorComponent implements OnInit {

  @Input() computation = false;
  @Input() indicator: Indicator;
  
  constructor() { }

  ngOnInit(): void {
  }

}
