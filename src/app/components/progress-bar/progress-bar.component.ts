import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnInit {

  @Input() progress: number;
  @Input() total = 100;
  color: string;

  constructor() { }

  ngOnInit(): void {
    this.progress = ( this.progress / this.total ) * 100;

    switch (true) {
      case (this.progress > 0): {
        this.color = 'green';
        break;
      }
      default: {
        this.color = 'grey';
        break;
      }
    }
  }

}
