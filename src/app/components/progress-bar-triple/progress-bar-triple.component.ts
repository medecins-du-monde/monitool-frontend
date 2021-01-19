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

  ngOnInit(): void {
    this.done = Math.round( (this.done / this.total) * 100);
    this.ongoing = Math.round((this.ongoing / this.total) * 100);
    this.missing = Math.round((this.missing / this.total) * 100);

    // Managing the visibility or not of the font
    if (window.innerWidth > 400 && window.innerWidth < 600) {
      document.getElementById('done').style.setProperty('font-size', this.done > 50 ? '12px' : '0' );
      document.getElementById('ongoing').style.setProperty('font-size', this.ongoing > 50 ? '12px' : '0');
      document.getElementById('missing').style.setProperty('font-size', this.missing > 50 ? '12px' : '0');
    }
    else if (window.innerWidth > 600) {
      document.getElementById('done').style.setProperty('font-size', this.done > 20 ? '12px' : '0' );
      document.getElementById('ongoing').style.setProperty('font-size', this.ongoing > 25 ? '12px' : '0');
      document.getElementById('missing').style.setProperty('font-size', this.missing > 20 ? '12px' : '0');
    }

  }

}
