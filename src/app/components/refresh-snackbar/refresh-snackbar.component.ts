import { Component, OnInit } from '@angular/core';
import { MatLegacySnackBarRef as MatSnackBarRef } from '@angular/material/legacy-snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { MultiLanguage } from 'src/app/models/classes/multi-language.model';


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
