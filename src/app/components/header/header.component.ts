import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { DateService} from 'src/app/services/date.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public isMobile: boolean;

  constructor(
    private translateService: TranslateService,
    private dateService: DateService,
    private authService: AuthService,
    private route: Router
  ) { }

  ngOnInit() {
    window.onresize = () => this.isMobile = window.innerWidth < 600;
    this.dateService.setCurrentLang(localStorage.getItem('language'));
  }

  getLangs() {
    return this.translateService.getLangs();
  }

  switchLang(lang: string) {
    this.translateService.use(lang);
    localStorage.setItem('language', lang);
    this.dateService.setCurrentLang(lang);
  }

  disconnect(){
    this.authService.logOut()
      .then( response => {
        if (response){
          this.route.navigate(['/login']);
        }
      });
  }
}
