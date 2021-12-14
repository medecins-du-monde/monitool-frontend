import { Component, OnInit } from '@angular/core';
import { MatSnackBarRef } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-refresh-snackbar',
  templateUrl: './refresh-snackbar.component.html',
  styleUrls: ['./refresh-snackbar.component.scss']
})
export class RefreshSnackbarComponent implements OnInit {

  constructor(
    private translateService: TranslateService,
    public snackBarRef: MatSnackBarRef<RefreshSnackbarComponent>,
  ) { }

  get currentLang(): string {
    return this.translateService.currentLang ? this.translateService.currentLang : this.translateService.defaultLang;
  }

  ngOnInit(): void {
    // onInit
  }


  reload(): void {
    location.reload();
  }
}
