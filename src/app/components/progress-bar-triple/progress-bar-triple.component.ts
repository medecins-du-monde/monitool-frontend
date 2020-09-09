import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-progress-bar-triple',
  templateUrl: './progress-bar-triple.component.html',
  styleUrls: ['./progress-bar-triple.component.scss']
})
export class ProgressBarTripleComponent implements OnInit {
  @Input() done: number;
  @Input() ongoing: number;
  @Input() missing: number;

  @Input() total = 100;

  constructor() { }

  ngOnInit(): void {
    this.done = (this.done / this.total) * 100;
    this.ongoing = (this.ongoing / this.total) * 100;
    this.missing = (this.missing / this.total) * 100;
  }

}
