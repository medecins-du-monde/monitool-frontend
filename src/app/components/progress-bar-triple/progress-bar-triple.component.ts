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

  // This method allow to show or not the text in the progress bar in function of the
  // size of the screen and the value of the item.
  getStyle(element?: string): string {
    switch (element) {
      case 'done': {
        if ((window.innerWidth > 600 && this.done > 20) ||
            (window.innerWidth > 400 && window.innerWidth < 600 && this.done > 50 )) {
          return '14px';
        }
        else {
          return '0';
        }
      }
      case 'ongoing': {
        if ((window.innerWidth > 600 && this.ongoing > 25) ||
            (window.innerWidth > 400 && window.innerWidth < 600 && this.ongoing > 50 )) {
          return '14px';
        }
        else {
          return '0';
        }
      }
      case 'missing': {
        if ((window.innerWidth > 600 && this.missing > 25) ||
            (window.innerWidth > 400 && window.innerWidth < 600 && this.missing > 50 )) {
          return '14px';
        }
        else {
          return '0';
        }
      }
    }
  }

  ngOnInit(): void {
    this.done = Math.round( (this.done / this.total) * 100);
    this.ongoing = Math.round((this.ongoing / this.total) * 100);
    this.missing = Math.round((this.missing / this.total) * 100);
  }

}
