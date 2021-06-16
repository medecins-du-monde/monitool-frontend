import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-loading-bar',
  templateUrl: './loading-bar.component.html',
  styleUrls: ['./loading-bar.component.scss']
})
export class LoadingBarComponent implements OnInit, OnChanges {

@Input() loadingComponent = false;
@Input() httpLoading = false;

  constructor(private spinnerService: NgxSpinnerService) {}
  ngOnInit(): void {
    this.spinnerUpdate();
  }
  ngOnChanges(): void {
    this.spinnerUpdate();
  }

  private spinnerUpdate() {
    if (this.loadingComponent || this.httpLoading) {
      this.spinnerService.show();
    }
    else {
      this.spinnerService.hide();
    }
  }

}
