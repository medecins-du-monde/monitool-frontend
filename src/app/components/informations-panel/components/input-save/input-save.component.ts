import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-input-save',
  templateUrl: './input-save.component.html',
  styleUrls: ['./input-save.component.scss']
})
export class InputSaveComponent implements OnInit {

  constructor(private translateService: TranslateService, private domSanitizer: DomSanitizer) { }

  ngOnInit(): void {
  }

  // We need the domSanitizer so that angular will display html tags in innerHTML
  transform(translatekey: string): SafeHtml {
    return this.domSanitizer.bypassSecurityTrustHtml(this.translateService.instant(translatekey));
  }
}
