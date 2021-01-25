import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-loading-bar',
  templateUrl: './loading-bar.component.html',
  styleUrls: ['./loading-bar.component.scss']
})
export class LoadingBarComponent implements OnInit {

timer: any;

  constructor(private spinnerService: NgxSpinnerService, private loadingService: LoadingService) {}

  ngOnInit(): void {
    /** Subscribing to check if we are still loading */
    this.loadingService.loaded.subscribe(value => {
      if (this.timer) { clearTimeout(this.timer); }
      if (value) {
        // The spinner appears after one second so he doesn t have to appear when the page is loaded very quickly
        this.timer = setTimeout(() => this.spinnerService.show(), 1000);
      }
      else { this.spinnerService.hide(); }
    });
  }

}
