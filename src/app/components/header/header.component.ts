import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public isMobile: boolean;

  constructor(
    private translateService: TranslateService
  ) { }

  ngOnInit() {
    window.onresize = () => this.isMobile = window.innerWidth < 600;
  }

  getLangs() {
    return this.translateService.getLangs();
  }

  switchLang(lang: string) {
    this.translateService.use(lang);
    localStorage.setItem('language', lang);
  }
}
