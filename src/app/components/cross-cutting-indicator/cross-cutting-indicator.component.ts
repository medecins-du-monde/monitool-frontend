import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-cross-cutting-indicator',
  templateUrl: './cross-cutting-indicator.component.html',
  styleUrls: ['./cross-cutting-indicator.component.scss']
})
export class CrossCuttingIndicatorComponent implements OnInit {
  @Input() computation = false;
  constructor() { }

  ngOnInit(): void {
  }

}
