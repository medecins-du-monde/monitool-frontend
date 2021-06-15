import { Component, Input, OnChanges } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-loading-bar',
  templateUrl: './loading-bar.component.html',
  styleUrls: ['./loading-bar.component.scss']
})
export class LoadingBarComponent implements OnChanges {

@Input() loadingComponent = false;
@Input() httpLoading = false;

  constructor(private spinnerService: NgxSpinnerService) {}

  ngOnChanges(): void {
    if (this.loadingComponent || this.httpLoading) {
      this.spinnerService.show();
    }
    else {
      this.spinnerService.hide();
    }
  }

}
