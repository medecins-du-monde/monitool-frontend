import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss']
})
export class InformationComponent implements OnInit {

  constructor(
    private domSanitizer: DomSanitizer,
    private translateService: TranslateService,
  ) {
  }

  ngOnInit(): void {
  }

  // We need the domSanitizer so that angular will display html tags in innerHTML
  transform(translatekey: string): SafeHtml {
    return this.domSanitizer.bypassSecurityTrustHtml(this.translateService.instant(translatekey));
  }

}
